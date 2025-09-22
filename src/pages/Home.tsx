import Cta from "@/components/modules/Home/Cta";
import Features from "@/components/modules/Home/Features";
import HeroSection from "@/components/modules/Home/HeroSection";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";

export default function Home() {


  return (
    <div>
      <HeroSection />
      <Steps />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
