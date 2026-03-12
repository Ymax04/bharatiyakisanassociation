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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    setTimeout(() => {
      const id = `BKA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      setMember({
        name: name.trim(),
        aadhar: aadhar.replace(/\s/g, ""),
        phone,
        bkaId: id,
        timestamp: new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" }),
      });
      setProcessing(false);
    }, 2500);
  };

  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a5");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`BKA-Membership-${member?.bkaId}.pdf`);
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
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Aadhar Number / आधार नंबर</label>
                <input
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value.replace(/[^\d\s]/g, "").slice(0, 14))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                />
                {errors.aadhar && <p className="mt-1 text-sm text-destructive">{errors.aadhar}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary-foreground">Phone Number / फ़ोन नंबर</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-saffron"
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={processing}
                className="btn-saffron w-full disabled:opacity-60"
                whileTap={{ scale: 0.97 }}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-primary-foreground"
                    />
                    Processing...
                  </span>
                ) : (
                  "Submit & Get Parchii 📄"
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg"
            >
              <div ref={receiptRef} className="receipt-card">
                <div className="mb-6 border-b-2 border-primary/20 pb-4 text-center">
                  <h3 className="text-hindi text-2xl font-bold text-primary">भारतीय किसान संघ</h3>
                  <p className="text-sm font-semibold text-primary">BHARATIYA KISAN ASSOCIATION</p>
                  <p className="mt-1 text-xs text-muted-foreground">Digital Membership Receipt / डिजिटल सदस्यता रसीद</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-dashed border-border pb-2">
                    <span className="font-semibold text-muted-foreground">BKA ID:</span>
                    <span className="font-bold text-primary">{member.bkaId}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-border pb-2">
                    <span className="font-semibold text-muted-foreground">Name / नाम:</span>
                    <span className="font-bold text-foreground">{member.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-border pb-2">
                    <span className="font-semibold text-muted-foreground">Aadhar:</span>
                    <span className="font-mono text-foreground">{maskedAadhar(member.aadhar)}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-border pb-2">
                    <span className="font-semibold text-muted-foreground">Phone:</span>
                    <span className="font-mono text-foreground">{member.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-muted-foreground">Date / तारीख:</span>
                    <span className="text-foreground">{member.timestamp}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-md bg-primary/5 p-3 text-center">
                  <p className="text-hindi text-sm font-semibold text-primary">
                    "जय किसान — जय हिंद" 🇮🇳
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={downloadPDF} className="btn-forest flex-1">
                  📥 Download PDF
                </button>
                <button onClick={() => window.print()} className="btn-saffron flex-1">
                  🖨️ Print
                </button>
              </div>
              <button
                onClick={() => { setMember(null); setName(""); setAadhar(""); setPhone(""); }}
                className="mt-4 w-full text-center text-sm text-muted-foreground underline hover:text-primary"
              >
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
