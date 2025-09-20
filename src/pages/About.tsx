import teamImage from "@/assets/teamImage.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Award, Globe, Heart, Shield, Target, Zap } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer First",
      description:
        "Every decision we make puts our customers' needs and safety at the forefront.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Security",
      description:
        "Rigorous background checks and continuous monitoring ensure safe rides.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Constantly improving our technology to enhance user experience.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainability",
      description:
        "Committed to reducing carbon footprint through efficient ride matching.",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former tech executive with 15+ years in transportation technology.",
      image: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Software architect specializing in scalable mobile platforms.",
      image: "👨‍💻",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      bio: "Operations expert with background in logistics and supply chain.",
      image: "👩‍💼",
    },
    {
      name: "David Kim",
      role: "Head of Safety",
      bio: "Former law enforcement officer focused on rider and driver safety.",
      image: "👨‍💼",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description:
        "Started with a vision to revolutionize urban transportation",
    },
    {
      year: "2021",
      title: "First Million Rides",
      description: "Reached our first major milestone in user satisfaction",
    },
    {
      year: "2022",
      title: "50 Cities Launch",
      description: "Expanded to 50 cities across North America",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description:
        "Achieved carbon neutral operations through green initiatives",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Launching in international markets with local partnerships",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              About <span className="text-primary">RideShare</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make transportation accessible, safe, and
              sustainable for everyone. Since 2020, we've been connecting
              communities through reliable ride-sharing technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={teamImage}
                alt="Our team"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  To provide safe, reliable, and affordable transportation that
                  connects communities and empowers economic opportunity for
                  drivers while delivering exceptional experiences for riders.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  To become the world's most trusted transportation platform,
                  leading the transition to sustainable mobility solutions that
                  benefit people, communities, and the planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto text-primary mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Meet Our Leadership Team
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Experienced leaders driving innovation in transportation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    {member.image}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Key milestones in our company's growth
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a reliable ride or want to earn as a
            driver, be part of the transportation revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 bg-primary-foreground"
            >
              Start Riding
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
