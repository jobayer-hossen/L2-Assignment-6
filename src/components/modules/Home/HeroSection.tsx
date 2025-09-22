import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import rideAnimation from "../../../../src/assets/Car Trip.json";

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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 lg:mb-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Move Smarter with<span className="text-primary"> RideNow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
            >
              Get to your destination faster, safer, and at the best price.
              Whether you’re heading to work, school, or a night out,
              RideNow is here for you 24/7.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              {userInfo?.data?.role === "DRIVER" ? (
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link to="/vehicles">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-3 cursor-pointer bg-primary hover:shadow-primary"
                    >
                      Register Your Vehicle
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
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

                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Link to="/register">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-3 cursor-pointer"
                      >
                        Become a Partner
                      </Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2M+</div>
                <div className="text-sm text-muted-foreground">Rides Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">80K+</div>
                <div className="text-sm text-muted-foreground">Drivers Onboard</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.95★</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section (Lottie Animation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
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
