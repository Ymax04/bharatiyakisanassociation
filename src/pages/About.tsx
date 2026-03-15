import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Target, Eye, Heart, Sprout, ArrowLeft, Users, Crown, Shield, BookOpen, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TopBanner from "@/components/TopBanner";
import FooterSection from "@/components/FooterSection";

import memberVinod from "@/assets/member-vinod-kumar.jpg";
import memberAmit from "@/assets/member-amit-raj.jpg";
import memberIndra from "@/assets/member-indra-yadav.jpg";
import memberAlok from "@/assets/member-alok-yadav.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const leaders = [
  {
    name: "विनोद कुमार",
    nameEn: "Vinod Kumar",
    position: "संरक्षक",
    description: "संगठन के सर्वोच्च संरक्षक और राष्ट्रीय स्तर पर किसानों की आवाज़। उनकी अगुवाई में संगठन ने कई मांगों को सफलतापूर्वक पूरा किया है।",
    photo: memberVinod,
    icon: <Crown size={18} />,
  },
  {
    name: "अमित राज यदुवंशी",
    nameEn: "Amit Raj Yaduvanshi",
    position: "राष्ट्रीय अध्यक्ष",
    description: "संगठन के संस्थापक और राष्ट्रीय अध्यक्ष। किसानों को एकजुट करने और उनकी समस्याओं को हल करने में अग्रणी भूमिका।",
    photo: memberAmit,
    icon: <Shield size={18} />,
  },
  {
    name: "इंद्रा यादव",
    nameEn: "Indra Yadav",
    position: "राष्ट्रीय कोषाध्यक्ष",
    description: "संगठन की वित्तीय पारदर्शिता और ईमानदारी के संरक्षक। हर पैसे का हिसाब रखने वाले।",
    photo: memberIndra,
    icon: <Landmark size={18} />,
  },
  {
    name: "आलोक चौधरी",
    nameEn: "Alok chaudhary",
    position: "राष्ट्रीय महासचिव",
    description: "संगठन के संचालन और रणनीतिक विस्तार के प्रमुख। देश भर में संगठन के कार्यकर्ताओं को जोड़ने में अग्रणी भूमिका।",
    photo: memberAlok,
    icon: <BookOpen size={18} />,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>हमारे बारे में (About Us) - Bharatiya Kisan Association</title>
        <meta name="description" content="भारतीय किसान एसोसिएशन के बारे में जानें। हमारे राष्ट्रीय अध्यक्ष अमित राज यदुवंशी, संरक्षक विनोद कुमार, और अन्य नेताओं (Indra Yadav, Alok chaudhary) के दृष्टिकोण व यूपी (UP) के प्रति हमारी विशेष प्रतिबद्धता के बारे में पढ़ें।" />
        <link rel="canonical" href="https://bka.org.in/about" />
      </Helmet>
      <Navbar />
      <div className="pt-14">
        <TopBanner />

        {/* HERO BANNER — compact */}
        <div className="banner-gradient relative pt-20 pb-8 md:pt-24 md:pb-10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="float-animation absolute top-8 left-[8%] text-3xl md:text-5xl opacity-10">🌾</div>
            <div className="float-animation absolute top-12 right-[12%] text-2xl md:text-4xl opacity-8" style={{ animationDelay: "1.5s" }}>🌻</div>
            <div className="float-animation absolute bottom-4 left-[20%] text-xl md:text-3xl opacity-8" style={{ animationDelay: "3s" }}>🌿</div>
            <div className="float-animation absolute bottom-6 right-[6%] text-2xl md:text-4xl opacity-10" style={{ animationDelay: "2s" }}>🌱</div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 mb-3 rounded-full bg-white/15 px-3 py-1.5 text-xs md:text-sm font-medium text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-colors"
              >
                <ArrowLeft size={14} />
                मुख्य पृष्ठ
              </Link>
            </motion.div>

            <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
              className="text-hindi text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg"
            >
              हमारे बारे में
            </motion.h1>

            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
              className="text-hindi text-sm md:text-base text-white/85 max-w-2xl mx-auto leading-snug"
            >
              भारतीय किसान एसोसिएशन — किसानों की आवाज़, किसानों का संगठन
            </motion.p>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
              className="mt-3 flex items-center justify-center gap-2"
            >
              <span className="h-px w-8 bg-white/30" />
              <span className="text-base">🌾</span>
              <span className="h-px w-8 bg-white/30" />
            </motion.div>
          </div>
        </div>

        {/* ORG INTRODUCTION */}
        <section className="bg-cream px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="relative rounded-2xl bg-white p-6 md:p-10 shadow-xl border border-forest/10"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl gradient-forest" />
              <div className="flex items-start gap-3 mb-5">
                <div className="flex-shrink-0 rounded-xl gradient-saffron p-2.5">
                  <Heart className="text-white" size={24} />
                </div>
                <h2 className="text-hindi text-xl md:text-3xl font-bold text-primary">
                  संगठन का परिचय
                </h2>
              </div>

              <div className="space-y-4 text-hindi text-sm md:text-base text-foreground/80 leading-relaxed">
                <p>
                  भारतीय किसान एसोसिएशन एक राष्ट्रीय स्तर का लघु एवं सीमांत किसानों का संगठन है।
                  इसकी स्थापना{" "}
                  <span className="font-bold text-forest">अमित राज यदुवंशी</span>{" "}
                  ने स्वर्गीय{" "}
                  <span className="font-bold text-forest">चौधरी महेंद्र सिंह टिकैत</span>{" "}
                  के विचारों से प्रेरित होकर की है।
                </p>
                <p>
                  इस संगठन का उद्देश्य किसानों को एकजुट करना तथा उनकी समस्याओं का समाधान छोटे से
                  लेकर बड़े स्तर तक करना है। आज भारतीय किसान एसोसिएशन पूरे देश में एक
                  राष्ट्रवादी और ईमानदार संगठन के रूप में जाना जाता है, जो किसानों के खेतों से
                  जुड़े छोटे-छोटे मुद्दों को उठाकर उन्हें बड़े स्तर पर समाधान तक पहुँचाने में सक्षम रहा है।
                </p>
                <p>
                  संगठन की एकता, अखंडता, ईमानदारी और वफादारी पूरे देश के सामने एक उदाहरण
                  है। संगठन का प्रत्येक कार्यकर्ता अपनी मेहनत और ईमानदारी से एक समर्पित कार्यकर्ता
                  के रूप में अपनी पहचान स्थापित करता है।
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="px-4 py-14 md:px-8 md:py-20 bg-muted">
          <div className="mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="text-center mb-10"
            >
              <h2 className="text-hindi text-2xl md:text-4xl font-extrabold text-primary mb-2">
                हमारा मिशन और दृष्टि
              </h2>
              <div className="mx-auto flex items-center justify-center gap-2">
                <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
                <span className="h-1 w-16 rounded-full gradient-saffron" />
                <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Mission */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}
                className="group rounded-2xl overflow-hidden"
              >
                <div className="glass-card-dark p-6 md:p-8 h-full transition-transform duration-300 group-hover:scale-[1.01]">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-saffron/20 p-2.5 ring-2 ring-saffron/30">
                    <Target className="text-saffron" size={26} />
                  </div>
                  <h3 className="text-hindi text-xl md:text-2xl font-bold text-white mb-3">
                    🎯 हमारा मिशन
                  </h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-saffron to-saffron-light mb-4" />
                  <div className="space-y-3 text-hindi text-sm md:text-base text-white/85 leading-relaxed">
                    <p>
                      वर्तमान में भारतीय किसान एसोसिएशन की प्रस्तावना में सबसे बड़ी और प्राथमिक मांग यह है कि देश में{" "}
                      <span className="font-bold text-saffron-light">किसान आयोग का गठन</span>{" "}
                      किया जाए।
                    </p>
                    <p>
                      साथ ही देश के किसानों को ऐसी नीति के अंतर्गत कर्ज़मुक्त किया जाना चाहिए, जिससे वे कर्ज़ के जाल में न फँसें। इस उद्देश्य की पूर्ति में किसान आयोग की महत्वपूर्ण भूमिका होगी।
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}
                className="group rounded-2xl overflow-hidden"
              >
                <div className="glass-card-dark p-6 md:p-8 h-full transition-transform duration-300 group-hover:scale-[1.01]">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-saffron/20 p-2.5 ring-2 ring-saffron/30">
                    <Eye className="text-saffron" size={26} />
                  </div>
                  <h3 className="text-hindi text-xl md:text-2xl font-bold text-white mb-3">
                    👁️ हमारी दृष्टि
                  </h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-saffron to-saffron-light mb-4" />
                  <div className="space-y-3 text-hindi text-sm md:text-base text-white/85 leading-relaxed">
                    <p>
                      न्यूनतम वार्षिक आय से कम आय वाले पत्रकारों को{" "}
                      <span className="font-bold text-saffron-light">₹5000 प्रतिमाह भत्ता</span>{" "}
                      दिया जाना चाहिए, क्योंकि वे भी समाज के श्रमिक वर्ग से जुड़े होते हैं और अक्सर किसान या मजदूर परिवारों से आते हैं।
                    </p>
                    <p>
                      इसी प्रकार सभी किसान और मजदूर जिनकी वार्षिक आय निर्धारित न्यूनतम स्तर से कम है, उन्हें भी{" "}
                      <span className="font-bold text-saffron-light">₹5000 प्रतिमाह भत्ता</span>{" "}
                      प्रदान किया जाना चाहिए।
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP DETAIL */}
        <section className="px-4 py-14 md:px-8 md:py-20 bg-cream">
          <div className="mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="text-center mb-10"
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

            <div className="grid gap-5 md:grid-cols-2">
              {leaders.map((leader, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  custom={i}
                  variants={fadeUp}
                  className="group"
                >
                  <div className="relative flex items-start gap-4 bg-white rounded-xl p-5 shadow-md border border-forest/10 hover:shadow-lg hover:border-saffron/20 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5 gradient-saffron opacity-60 group-hover:opacity-100 transition-opacity rounded-t-xl" />

                    {/* Photo — all boxy */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden ${i === 0 ? "border-saffron" : "border-forest/20"}`}>
                        <img src={leader.photo} alt={leader.nameEn} className="w-full h-full object-cover object-top" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-bold text-white ${i === 0 ? "gradient-saffron" : "gradient-forest"}`}>
                          {leader.icon}
                          {leader.position}
                        </span>
                      </div>
                      <h4 className="text-hindi text-sm md:text-base font-bold text-primary">
                        {leader.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground font-medium">
                        {leader.nameEn}
                      </p>
                      <p className="text-hindi text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gradient-forest px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <Sprout className="mx-auto mb-3 text-saffron" size={36} />
              <h2 className="text-hindi text-xl md:text-3xl font-bold text-white mb-3">
                किसानों के आंदोलन में शामिल हों
              </h2>
              <p className="text-hindi text-sm md:text-base text-white/75 mb-6 max-w-lg mx-auto">
                भारतीय किसान एसोसिएशन के साथ जुड़ें और किसानों की आवाज़ को मजबूत बनाएं
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/membership" className="btn-saffron !text-sm !px-6 !py-3">
                  🤝 सदस्य बनें
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </div>
  );
};

export default About;
