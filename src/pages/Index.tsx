import Navbar from "@/components/Navbar";
import NewsTicker from "@/components/NewsTicker";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import DonationSection from "@/components/DonationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NewsTicker />
      <HeroSection />
      <GallerySection />
      <MembershipSection />
      <DonationSection />
      <FooterSection />
    </div>
  );
};

export default Index;
