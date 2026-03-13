import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface MemberData {
  name: string;
  aadhar: string;
  phone: string;
  bkaId: string;
  timestamp: string;
}

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
  const [aadhar, setAadhar] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [member, setMember] = useState<MemberData | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!/^\d{12}$/.test(aadhar.replace(/\s/g, ""))) errs.aadhar = "Valid 12-digit Aadhar required";
    if (!/^\d{10}$/.test(phone)) errs.phone = "Valid 10-digit phone required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    try {
      const response = await fetch("https://formspree.io/f/meerkbqz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, aadhar, phone }),
      });

      if (response.ok) {
        const id = `BKA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        setMember({
          name: name.trim(),
          aadhar: aadhar.replace(/\s/g, ""),
          phone,
          bkaId: id,
          timestamp: new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" }),
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("Network error. Check your connection.");
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
    pdf.save(`BKA-Membership-${member.bkaId}.pdf`);
  };

  const maskedAadhar = (a: string) => `XXXX-XXXX-${a.slice(-4)}`;

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
              className="glass-card-dark mx-auto max-w-lg space-y-6 p-8"
            >
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
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Aadhar Number / आधार नंबर</label>
                <input
                  name="aadhar"
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value.replace(/[^\d\s]/g, "").slice(0, 14))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                  required
                />
                {errors.aadhar && <p className="mt-1 text-sm text-destructive">{errors.aadhar}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Phone Number / फ़ोन नंबर</label>
                <input
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>

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
              className="mx-auto max-w-lg"
            >
              <div ref={receiptRef} className="receipt-card bg-white p-6 rounded-lg shadow-xl">
                <div className="mb-6 border-b-2 border-primary/20 pb-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">भारतीय किसान संघ</h3>
                  <p className="text-sm font-semibold text-primary">BHARATIYA KISAN ASSOCIATION</p>
                </div>

                <div className="space-y-3 text-sm text-black">
                  <div className="flex justify-between"><span>BKA ID:</span><strong>{member.bkaId}</strong></div>
                  <div className="flex justify-between"><span>Name:</span><strong>{member.name}</strong></div>
                  <div className="flex justify-between"><span>Aadhar:</span><strong>{maskedAadhar(member.aadhar)}</strong></div>
                  <div className="flex justify-between"><span>Phone:</span><strong>{member.phone}</strong></div>
                  <div className="flex justify-between"><span>Date:</span><strong>{member.timestamp}</strong></div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={downloadPDF} className="bg-green-700 text-white p-3 rounded-lg flex-1">📥 Download PDF</button>
                <button onClick={() => window.print()} className="bg-orange-500 text-white p-3 rounded-lg flex-1">🖨️ Print</button>
              </div>
              <button onClick={() => setMember(null)} className="mt-4 w-full text-center text-sm underline">Register another member</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MembershipSection;