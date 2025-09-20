import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  BarChart,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Settings,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function Features() {
  const riderFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Easy Booking",
      description:
        "Book rides with just a few taps. Set pickup location, destination, and ride preferences instantly.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Real-time Tracking",
      description:
        "Track your driver's location in real-time and get accurate arrival estimates.",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Multiple Payment Options",
      description:
        "Pay with credit cards, digital wallets, or cash. Split fares with friends easily.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description:
        "Emergency button, trip sharing, and 24/7 support for your peace of mind.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Rate & Review",
      description:
        "Rate your experience and help maintain high service quality in our community.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ride History",
      description:
        "Access your complete ride history with receipts for easy expense tracking.",
    },
  ];

  const driverFeatures = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Flexible Schedule",
      description:
        "Drive when you want. Set your own hours and work around your lifestyle.",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Earnings Dashboard",
      description:
        "Track your earnings in real-time with detailed breakdown and analytics.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Navigation",
      description:
        "Get optimized routes and avoid traffic with our integrated navigation system.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Driver Community",
      description:
        "Connect with other drivers, share tips, and get support from our community.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Insurance Coverage",
      description:
        "Drive with confidence knowing you're covered with comprehensive insurance.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Payouts",
      description:
        "Get paid instantly after each ride or cash out weekly - your choice.",
    },
  ];

  const adminFeatures = [
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights into rides, drivers, revenue, and user behavior.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Management",
      description:
        "Manage riders and drivers with detailed profiles and activity tracking.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "System Configuration",
      description:
        "Configure pricing, service areas, vehicle types, and operational parameters.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety Monitoring",
      description:
        "Monitor trips, handle emergencies, and ensure platform safety standards.",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Financial Management",
      description:
        "Track payments, manage driver payouts, and generate financial reports.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality Assurance",
      description:
        "Review ratings, handle disputes, and maintain service quality standards.",
    },
  ];

  const platformFeatures = [
    {
      title: "Advanced Matching Algorithm",
      description:
        "AI-powered system that matches riders with the closest available drivers for minimal wait times.",
      badge: "AI Powered",
    },
    {
      title: "Dynamic Pricing",
      description:
        "Smart pricing that adjusts based on demand, distance, and time to ensure fair rates.",
      badge: "Smart Pricing",
    },
    {
      title: "Multi-Language Support",
      description:
        "Available in 20+ languages to serve diverse communities worldwide.",
      badge: "Global Ready",
    },
    {
      title: "Accessibility Features",
      description:
        "Features for riders with disabilities including wheelchair-accessible vehicle options.",
      badge: "Inclusive",
    },
    {
      title: "Carbon Offset Program",
      description:
        "Optional carbon offset for rides to support environmental sustainability.",
      badge: "Eco Friendly",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Round-the-clock support team available via chat, phone, and email.",
      badge: "Always Available",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              Platform <span className="text-primary">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive features that make RideShare the
              preferred choice for riders, drivers, and administrators
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Features by User Type */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="riders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="riders" className="text-lg">
                For Riders
              </TabsTrigger>
              <TabsTrigger value="drivers" className="text-lg">
                For Drivers
              </TabsTrigger>
              <TabsTrigger value="admins" className="text-lg">
                For Admins
              </TabsTrigger>
            </TabsList>

            {/* Rider Features */}
            <TabsContent value="riders" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Rider Experience
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need for safe, convenient, and enjoyable rides
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {riderFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Driver Features */}
            <TabsContent value="drivers" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Driver Tools
                </h2>
                <p className="text-lg text-muted-foreground">
                  Powerful tools to help drivers maximize earnings and
                  efficiency
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {driverFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Admin Features */}
            <TabsContent value="admins" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Admin Dashboard
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive management tools for platform administrators
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adminFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Platform-wide Features */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Platform Highlights
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Advanced capabilities that set us apart from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Platform Statistics
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Numbers that showcase our platform's success
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Active Riders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Verified Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Completed Rides</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
            Experience All Features Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our platform and discover why millions choose RideShare for
            their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start as Rider
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              Become a Driver
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
