import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import bkaLogo from "@/assets/bka-logo.jpg";
import { API_URL } from "@/config";

interface MemberData {
  name: string;
  district: string;
  address: string;
  phone: string;
  bkaId: string;
  timestamp: string;
}

const UP_DISTRICTS = [
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya",
  "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki",
  "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli",
  "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad",
  "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur",
  "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
  "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow",
  "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur",
  "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli",
  "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli",
  "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
];

const ScrollReveal = ({ children, direction = "right" }: { children: React.ReactNode; direction?: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const MembershipSection = () => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // Honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState(""); // General submission errors
  const [phoneDuplicateError, setPhoneDuplicateError] = useState(false); // true when backend returns PhoneExists
  const [processing, setProcessing] = useState(false);
  const [member, setMember] = useState<MemberData | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) errs.name = "Name required (min 3 chars)";
    if (!district) errs.district = "District is required";
    if (!address.trim() || address.trim().length < 10) errs.address = "Address required (min 10 chars)";
    if (!/^\d{10}$/.test(phone)) errs.phone = "Valid 10-digit phone required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setPhoneDuplicateError(false);

    // Honeypot: if browser auto-filled the hidden field, clear it and continue (don't block real users).
    if (company !== "") {
      setCompany("");
    }

    if (!validate()) return;

    // 2. Rate Limiting check (60 seconds)
    const lastSubmit = localStorage.getItem("lastSubmitTime");
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < 60000) {
      setSubmitError(`Please wait ${Math.ceil((60000 - (now - parseInt(lastSubmit))) / 1000)} seconds before submitting again to prevent spam.`);
      return;
    }
    localStorage.setItem("lastSubmitTime", now.toString());

    setProcessing(true);
    try {
      // 3. Generate Unique Member ID: BKA-XXXXXXXX
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let idStr = "";
      for (let i = 0; i < 8; i++) {
        idStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const memberId = `BKA-${idStr}`;

      // 4. Send to Apps Script
      let success = false;
      let serverError = "";

      try {
        const payload = {
          action: "register",
          memberId: memberId,
          name: name.trim(),
          district: district,
          address: address.trim(),
          phone: phone,
          company: "" // Always send empty; honeypot is frontend-only so real users aren't blocked.
        };

        // Use text/plain to avoid CORS preflight (OPTIONS); Google Apps Script returns 405 for OPTIONS.
        // Backend must read e.postData.contents and JSON.parse() the body.
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          body: JSON.stringify(payload),
        });

        const result = await response.text();
        const trimmed = result.trim();

        // For this Apps Script, register only ever returns "Success" or "PhoneExists"
        if (trimmed === "Success" || trimmed.toLowerCase() === "success") {
          success = true;
        } else {
          // Treat any non-success response from register as duplicate phone
          setPhoneDuplicateError(true);
          setSubmitError("User already registered hai is phone number se.");
          return;
        }

        if (!success && response.status >= 400) {
          serverError = serverError || `Server error (${response.status}). Please try again.`;
        }
      } catch (err) {
        console.error("Fetch error:", err);
        serverError = "Network error. Check your connection and try again.";
      }

      if (success) {
        setMember({
          name: name.trim(),
          district,
          address: address.trim(),
          phone,
          bkaId: memberId,
          timestamp: new Date().toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        });
        setSubmitError("");
      } else {
        setSubmitError(serverError || "Registration failed on server. Please try again.");
      }
    } catch (error) {
      setSubmitError("Network error. Check your connection.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = async () => {
    if (!receiptRef.current || !member) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a5");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`BKA-Receipt-${member.bkaId}.pdf`);
  };

  return (
    <section id="membership" className="section-padding bg-background">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal direction="right">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-primary md:text-5xl">
            ✊ Join the Movement
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Become a proud member of Bharatiya Kisan Association
          </p>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!member ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card-dark mx-auto max-w-lg space-y-6 p-8"
            >
              {/* Honeypot Field */}
              <input
                type="text"
                name="company"
                className="honeypot-field"
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
              />

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Full Name / पूरा नाम</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="e.g. Ramesh Kumar"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">District / जिला</label>
                <select
                  name="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron appearance-none"
                  required
                >
                  <option value="" disabled>Select District</option>
                  {UP_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-1 text-sm text-destructive">{errors.district}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Address / पता</label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                  placeholder="Enter your full address"
                  rows={3}
                />
                {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Phone Number / फ़ोन नंबर</label>
                <input
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setPhoneDuplicateError(false);
                  }}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron ${phoneDuplicateError ? "border-destructive ring-2 ring-destructive/30" : "border-input"}`}
                  placeholder="9876543210"
                />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>

              {submitError && (
                <div className="bg-destructive/10 border border-destructive/30 p-3 rounded-lg text-center text-sm font-semibold text-destructive">
                  {submitError}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={processing}
                className="btn-saffron w-full disabled:opacity-60"
                whileTap={{ scale: 0.97 }}
              >
                {processing ? "Processing..." : "Submit & Get Parchii 📄"}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-[600px] w-[90%]"
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
                <p className="text-sm md:text-base text-muted-foreground">Your membership receipt has been generated.<br/>Please download or print it for your records.</p>
              </div>

              <div ref={receiptRef} className="receipt-card">
                <div className="receipt-header text-center border-b-2 border-forest/30 pb-4 mb-4">
                  <img src={bkaLogo} alt="BKA Logo" className="receipt-logo" />
                  <h2 className="text-xl md:text-2xl font-bold text-forest mt-2 text-hindi">भारतीय किसान संघ</h2>
                  <h3 className="text-xs md:text-sm font-bold text-forest mt-1">BHARATIYA KISAN ASSOCIATION</h3>
                </div>

                <div className="receipt-info space-y-1 text-sm md:text-base text-black">
                  <div className="row">
                    <span className="font-semibold text-gray-500">BKA ID</span>
                    <strong id="receipt-id" className="text-forest font-bold">{member.bkaId}</strong>
                  </div>
                  <div className="row">
                    <span className="font-semibold text-gray-500">Name</span>
                    <strong id="receipt-name">{member.name}</strong>
                  </div>
                  <div className="row">
                    <span className="font-semibold text-gray-500">District</span>
                    <strong id="receipt-district">{member.district}</strong>
                  </div>
                  <div className="row">
                    <span className="font-semibold text-gray-500">Address</span>
                    <strong id="receipt-address" className="text-right max-w-[65%] leading-snug">{member.address}</strong>
                  </div>
                  <div className="row">
                    <span className="font-semibold text-gray-500">Phone</span>
                    <strong id="receipt-phone">{member.phone}</strong>
                  </div>
                  <div className="row !border-none">
                    <span className="font-semibold text-gray-500">Date</span>
                    <strong id="receipt-date">{member.timestamp}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button onClick={downloadPDF} className="btn-download px-4 py-3 rounded-lg font-bold flex-1 text-center cursor-pointer transition-colors">
                  📥 Download PDF
                </button>
                <button onClick={() => window.print()} className="btn-print px-4 py-3 rounded-lg font-bold flex-1 text-center cursor-pointer transition-colors">
                  🖨️ Print
                </button>
              </div>
              <button onClick={() => setMember(null)} className="mt-6 w-full text-center text-sm tracking-wide font-medium underline text-muted-foreground hover:text-foreground">
                Register another member
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MembershipSection;