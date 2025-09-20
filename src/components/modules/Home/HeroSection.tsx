import { Button } from "@/components/ui/button";

import heroImage from "@/assets/hero-image.png";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ArrowRight, Badge } from "lucide-react";
import { Link } from "react-router";

export default function HeroSection() {
  const { data: userInfo } = useUserInfoQuery(undefined);

  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10 z-[-1]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Now Available in 50+ Cities
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your Ride is Just a<span className="text-primary"> Tap Away</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Experience seamless transportation with our reliable ride booking
              platform. Safe, affordable, and convenient rides whenever you need
              them.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {userInfo?.data?.role === "DRIVER" ? (
                <>
                  <Link to="/vehicles">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-3 cursor-pointer bg-primary hover:shadow-primary"
                    >
                      Add Your Vehicles
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/ride-request">
                    <Button
                      size="lg"
                      className="bg-primary hover:shadow-primary text-lg px-8 py-3 cursor-pointer"
                    >
                      Book Your Ride
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-3 cursor-pointer"
                    >
                      Become a Driver
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Riders
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Drivers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Ride booking interface"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
