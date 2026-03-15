import { motion } from "framer-motion";
import { User, Crown, Shield, BookOpen, Landmark } from "lucide-react";

interface Member {
  id: number;
  name: string;
  position: string;
  description: string;
  photo: string | null;
  icon: React.ReactNode;
  rank: number; // 1=top
}

const members: Member[] = [
  {
    id: 1,
    name: "नाम जल्द आ रहा है",
    position: "राष्ट्रीय अध्यक्ष",
    description: "संगठन के सर्वोच्च नेता",
    photo: null,
    icon: <Crown size={20} />,
    rank: 1,
  },
  {
    id: 2,
    name: "नाम जल्द आ रहा है",
    position: "राष्ट्रीय उपाध्यक्ष",
    description: "नीतिगत मांगों के प्रवक्ता",
    photo: null,
    icon: <Shield size={20} />,
    rank: 2,
  },
  {
    id: 3,
    name: "नाम जल्द आ रहा है",
    position: "राष्ट्रीय महासचिव",
    description: "संगठन संचालन प्रमुख",
    photo: null,
    icon: <BookOpen size={20} />,
    rank: 3,
  },
  {
    id: 4,
    name: "नाम जल्द आ रहा है",
    position: "राष्ट्रीय कोषाध्यक्ष",
    description: "वित्तीय पारदर्शिता संरक्षक",
    photo: null,
    icon: <Landmark size={20} />,
    rank: 4,
  },
];

const MemberCard = ({
  member,
  size = "sm",
  delay = 0,
}: {
  member: Member;
  size?: "lg" | "md" | "sm";
  delay?: number;
}) => {
  const sizeClasses = {
    lg: "w-28 h-28 md:w-36 md:h-36",
    md: "w-24 h-24 md:w-28 md:h-28",
    sm: "w-20 h-20 md:w-24 md:h-24",
  };
  const iconSize = size === "lg" ? 44 : size === "md" ? 36 : 30;
  const isTop = size === "lg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col items-center text-center"
    >
      {/* Photo circle */}
      <div className="relative mb-3">
        <div
          className={`${sizeClasses[size]} rounded-full border-[3px] ${
            isTop
              ? "border-saffron shadow-lg shadow-saffron/20"
              : "border-dashed border-forest/40"
          } flex items-center justify-center bg-forest/5 group-hover:border-saffron transition-all duration-300`}
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User
              className="text-forest/30 group-hover:text-saffron/50 transition-colors duration-300"
              size={iconSize}
            />
          )}
        </div>
        {/* Rank badge */}
        <div
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] md:text-xs font-bold text-white ${
            isTop ? "gradient-saffron" : "gradient-forest"
          }`}
        >
          {member.icon}
        </div>
      </div>

      {/* Position */}
      <span
        className={`text-hindi font-bold ${
          isTop
            ? "text-sm md:text-base text-saffron"
            : "text-xs md:text-sm text-primary"
        }`}
      >
        {member.position}
      </span>

      {/* Name */}
      <h4 className="text-hindi text-sm md:text-base font-semibold text-foreground/70 mt-0.5">
        {member.name}
      </h4>

      {/* Description — only on larger cards */}
      {(size === "lg" || size === "md") && (
        <p className="text-hindi text-[11px] md:text-xs text-muted-foreground mt-1">
          {member.description}
        </p>
      )}
    </motion.div>
  );
};

const LeadershipSection = () => {
  return (
    <section
      id="leadership"
      className="px-4 py-10 md:px-8 md:py-14 bg-muted relative overflow-hidden"
    >
      {/* Subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-forest/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-saffron/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-hindi text-2xl md:text-4xl font-extrabold text-primary mb-2">
            हमारे प्रमुख किसान नेता
          </h2>
          <div className="mx-auto flex items-center justify-center gap-2 mb-2">
            <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
            <span className="h-1 w-16 rounded-full gradient-saffron" />
            <span className="h-0.5 w-8 bg-primary/30 rounded-full" />
          </div>
        </motion.div>

        {/* Hierarchy pyramid – 1 : 1 : 2 layout */}
        <div className="flex flex-col items-center gap-6">
          {/* Row 1 — President (largest) */}
          <MemberCard member={members[0]} size="lg" delay={0} />

          {/* Connector line */}
          <div className="w-px h-6 bg-forest/20" />

          {/* Row 2 — Vice President */}
          <MemberCard member={members[1]} size="md" delay={0.15} />

          {/* Connector lines to bottom row */}
          <div className="flex items-end justify-center gap-20 md:gap-32 -mb-2">
            <div className="w-px h-6 bg-forest/20" />
            <div className="w-px h-6 bg-forest/20" />
          </div>

          {/* Row 3 — Secretary + Treasurer */}
          <div className="flex justify-center gap-10 md:gap-24">
            <MemberCard member={members[2]} size="sm" delay={0.3} />
            <MemberCard member={members[3]} size="sm" delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
