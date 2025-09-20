import Cta from "@/components/modules/Home/Cta";
import Features from "@/components/modules/Home/Features";
import HeroSection from "@/components/modules/Home/HeroSection";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import AvailableRide from "./driver/AvailableRide";

export default function Home() {
  const { data: userInfo } = useUserInfoQuery(undefined);

  return (
    <div>
      <HeroSection />
      {userInfo?.data?.role === "DRIVER" && <AvailableRide />}
      <Steps />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
