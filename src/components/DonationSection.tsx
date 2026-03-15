import { motion } from "framer-motion";
import upiQr from "@/assets/upi-qr.png";

const ScrollReveal = ({ children, direction = "left" }: { children: React.ReactNode; direction?: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const DonationSection = () => {
  return (
    <section id="donation" className="section-padding gradient-forest">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal direction="left">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-primary-foreground md:text-5xl">
            💚 Support the Cause
          </h2>
          <p className="mb-12 text-center text-primary-foreground/80">
            Your contribution strengthens the movement for farmer welfare
          </p>
        </ScrollReveal>

        <div className="flex justify-center">
          {/* UPI QR */}
          <ScrollReveal direction="right">
            <div className="glass-card flex h-full w-full max-w-md flex-col items-center justify-center p-8 text-primary-foreground">
              <h3 className="mb-6 text-xl font-bold">📱 UPI / QR Payment</h3>
              <div className="mb-6 rounded-xl bg-white p-4">
                <img
                  src={upiQr}
                  alt="UPI QR Code for donations"
                  className="mx-auto w-48 md:w-56"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm text-primary-foreground/70">
                Scan with any UPI app — GPay, PhonePe, Paytm & more
              </p>
              <p className="mt-2 text-hindi text-center text-sm text-primary-foreground/60">
                आपका हर योगदान किसानों के भविष्य को सुरक्षित करता है
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
