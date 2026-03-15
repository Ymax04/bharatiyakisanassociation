import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Crown, Shield, BookOpen, Landmark } from "lucide-react";

import memberVinod from "@/assets/member-vinod-kumar.jpg";
import memberAmit from "@/assets/member-amit-raj.jpg";
import memberIndra from "@/assets/member-indra-yadav.jpg";
import memberAlok from "@/assets/member-alok-yadav.jpg";

const members = [
  {
    id: 1,
    name: "विनोद कुमार",
    nameEn: "Vinod Kumar",
    position: "संरक्षक",
    description:
      "संगठन के सर्वोच्च संरक्षक और राष्ट्रीय स्तर पर किसानों की आवाज़।",
    photo: memberVinod,
    icon: <Crown size={18} />,
  },
  {
    id: 2,
    name: "अमित राज यदुवंशी",
    nameEn: "Amit Raj Yaduvanshi",
    position: "राष्ट्रीय अध्यक्ष",
    description:
      "संगठन के संस्थापक और राष्ट्रीय अध्यक्ष। किसानों को एकजुट करने में अग्रणी।",
    photo: memberAmit,
    icon: <Shield size={18} />,
  },
  {
    id: 3,
    name: "इंद्रा यादव",
    nameEn: "Indra Yadav",
    position: "राष्ट्रीय कोषाध्यक्ष",
    description: "संगठन की वित्तीय पारदर्शिता और ईमानदारी के संरक्षक।",
    photo: memberIndra,
    icon: <Landmark size={18} />,
  },
  {
    id: 4,
    name: "आलोक चौधरी",
    nameEn: "Alok chaudhary",
    position: "राष्ट्रीय महासचिव",
    description: "संगठन के संचालन और रणनीतिक विस्तार के प्रमुख।",
    photo: memberAlok,
    icon: <BookOpen size={18} />,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* ── ABOUT INFO BANNER ── */}
      <div className="banner-gradient py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-hindi text-xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                भारतीय किसान एसोसिएशन
              </h2>
              <p className="text-hindi text-sm md:text-base text-white/85 leading-relaxed">
                भारतीय किसान एसोसिएशन राष्ट्रीय लघु किसानों का संगठन है। इसकी स्थापना{" "}
                <span className="font-bold text-yellow-200">
                  अमित राज यदुवंशी
                </span>{" "}
                द्वारा{" "}
                <span className="font-bold text-yellow-200">
                  स्वर्गीय चौधरी महेंद्र सिंह टिकैत
                </span>{" "}
                के विचारों को ध्यान में रखते हुए की गई है। किसानों को एकजुट करना और उनकी समस्याओं का समाधान करना ही हमारा मुख्य लक्ष्य है।
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-shrink-0 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/about" className="btn-saffron !text-sm gap-2 group">
                और जानें
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/25 transition-all"
              >
                <Users size={14} />
                हम से जुड़ें
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float-animation absolute top-3 left-[6%] text-2xl opacity-10">🌾</div>
          <div className="float-animation absolute bottom-3 right-[8%] text-2xl opacity-10" style={{ animationDelay: "2s" }}>🌱</div>
        </div>
      </div>

      {/* ── LEADERSHIP — LARGE MEMBER CARDS ── */}
      <div className="bg-muted px-4 py-10 md:px-8 md:py-14 relative overflow-hidden">
        {/* Subtle bg blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 bg-forest/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-saffron/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-1.5 mb-3 rounded-full gradient-forest px-4 py-1 text-xs font-semibold text-white">
              <Users size={13} /> नेतृत्व
            </span>
            <h2 className="text-hindi text-2xl md:text-4xl font-extrabold text-primary mb-2">
              हमारे प्रमुख किसान नेता
            </h2>
            <div className="mx-auto flex items-center justify-center gap-2">
              <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
              <span className="h-1 w-16 rounded-full gradient-saffron" />
              <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
            </div>
          </motion.div>

          {/* ── ROW 1: #1 Sanrakshak — Full width hero card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-saffron/30">
              {/* Gold top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 gradient-saffron z-10" />
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Photo — proper fit with bg color */}
                <div className="w-full md:w-[38%] bg-gradient-to-b from-sky-100 to-sky-200 relative flex items-end justify-center overflow-hidden min-h-[350px] md:min-h-[420px]">
                  <img
                    src={members[0].photo}
                    alt={members[0].nameEn}
                    className="w-full h-full object-contain object-bottom"
                  />
                  {/* Crown badge */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 rounded-full gradient-saffron px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                    <Crown size={16} />
                    #1
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex-1 gradient-forest p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                  <span className="inline-flex self-center md:self-start items-center gap-1.5 rounded-full bg-saffron/20 border border-saffron/30 px-4 py-1.5 text-sm font-bold text-saffron mb-4">
                    <Crown size={14} />
                    {members[0].position}
                  </span>
                  <h3 className="text-hindi text-2xl md:text-4xl font-bold text-white mb-1">
                    {members[0].name}
                  </h3>
                  <p className="text-sm text-white/40 mb-4 font-medium">
                    {members[0].nameEn}
                  </p>
                  <p className="text-hindi text-base md:text-lg text-white/75 leading-relaxed mb-6">
                    {members[0].description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <Link to="/membership" className="btn-saffron !text-sm !px-5 !py-2.5 gap-1.5">
                      🤝 सदस्यता लें
                    </Link>
                    <Link to="/donation" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition-all">
                      💚 हम से जुड़ें
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── ROW 2: #2 Rashtriya Adhyaksh — Large card ── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-forest/15">
              <div className="absolute top-0 left-0 right-0 h-1 gradient-forest" />
              <div className="flex flex-col md:flex-row-reverse items-stretch">
                {/* Photo — proper fit */}
                <div className="w-full md:w-[35%] bg-gradient-to-b from-cyan-100 to-cyan-200 relative flex items-end justify-center overflow-hidden min-h-[300px] md:min-h-[340px]">
                  <img
                    src={members[1].photo}
                    alt={members[1].nameEn}
                    className="w-full h-full object-contain object-bottom"
                  />
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full gradient-forest px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                    <Shield size={14} />
                    #2
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center text-center md:text-left">
                  <span className="inline-flex self-center md:self-start items-center gap-1.5 rounded-full bg-forest/10 border border-forest/20 px-3 py-1 text-xs font-bold text-primary mb-3">
                    <Shield size={12} />
                    {members[1].position}
                  </span>
                  <h3 className="text-hindi text-xl md:text-3xl font-bold text-primary mb-1">
                    {members[1].name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">
                    {members[1].nameEn}
                  </p>
                  <p className="text-hindi text-sm md:text-base text-foreground/70 leading-relaxed">
                    {members[1].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── ROW 3: #3 + #4 — Medium cards side by side ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {members.slice(2).map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-forest/10 hover:shadow-xl hover:border-saffron/20 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-saffron opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col items-center text-center p-6 md:p-8">
                    {/* Photo — last 2 members boxy */}
                    <div className="relative mb-4">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-lg border-[3px] border-forest/15 overflow-hidden bg-gradient-to-b from-cyan-50 to-cyan-100 group-hover:border-saffron/40 transition-colors duration-300">
                        <img
                          src={member.photo}
                          alt={member.nameEn}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Badge */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full gradient-forest px-2.5 py-1 text-[10px] font-bold text-white shadow">
                        {member.icon}
                        #{i + 3}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-primary mb-2">
                      {member.icon}
                      {member.position}
                    </span>
                    <h4 className="text-hindi text-lg md:text-xl font-bold text-primary mb-0.5">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground font-medium mb-2">
                      {member.nameEn}
                    </p>
                    <p className="text-hindi text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Consistent CTA bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl gradient-forest p-6 md:p-8 text-center shadow-xl"
          >
            <p className="text-hindi text-base md:text-xl font-bold text-white mb-4">
              किसानों के आंदोलन में शामिल हों — आज ही जुड़ें!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/membership" className="btn-saffron !text-sm !px-6 !py-3 gap-2">
                🤝 सदस्यता लें
              </Link>
              <Link
                to="/donation"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all"
              >
                💚 हम से जुड़ें
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
