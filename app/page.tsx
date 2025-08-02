import CommunitySection from "@/components/landing-page/sections/community-section";
import FAQSection from "@/components/landing-page/sections/faq-section";
import FinalCTASection from "@/components/landing-page/sections/final-cta-section";
import HeroSection from "@/components/landing-page/sections/hero-section";
import ProcessSection from "@/components/landing-page/sections/process-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <CommunitySection />
      <FAQSection />
      <FinalCTASection />
    </>

  );
}
