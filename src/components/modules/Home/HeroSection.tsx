import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import rideAnimation from "../../../../src/assets/Car Trip.json";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8 } },
});

export default function HeroSection() {
  const { data: userInfo } = useUserInfoQuery(undefined);

  return (
    <section className="relative w-full pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      {/* Background gradient + blob animation */}
      <div className="absolute inset-0 z-[-2]">
        <div className="blob blob1"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-hero opacity-10 z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 lg:mb-0"
          >
            <motion.h1
              variants={fadeUp(0)}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Move Smarter with<span className="text-primary"> RideNow</span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.2)}
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
            >
              Get to your destination faster, safer, and at the best price.
              Whether you’re heading to work, school, or a night out, RideNow is
              here for you 24/7.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp(0.4)}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              {userInfo?.data?.role === "DRIVER" ? (
                <motion.div variants={fadeUp(0.6)}>
                  <Link to="/pick-a-ride">
                    <Button
                      size="lg"
                      className="bg-primary hover:shadow-primary text-lg px-8 py-3 cursor-pointer"
                    >
                      Pick a Ride
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={fadeUp(0.6)}>
                    <Link to="/ride-request">
                      <Button
                        size="lg"
                        className="bg-primary hover:shadow-primary text-lg px-8 py-3 cursor-pointer"
                      >
                        Request a Ride
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div variants={fadeUp(0.8)}>
                    <Link to="/be-a-driver">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-3 cursor-pointer"
                      >
                        Be a Driver
                      </Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp(1)}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {[
                { value: "2M", label: "Rides Completed" },
                { value: "80K", label: "Drivers Onboard" },
                { value: "4.95", label: "User Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(1 + i * 0.2)}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section (Lottie Animation) */}
          <motion.div
            variants={fadeUp(1.2)}
            className="relative"
          >
            <Lottie
              animationData={rideAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-[400px] lg:h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
