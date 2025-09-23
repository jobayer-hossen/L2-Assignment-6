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
import { motion } from "framer-motion";
import { scrollToTop } from "@/hooks/scroll";

export default function About() {
  scrollToTop()
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer First",
      description:
        "Our riders and drivers are our priority. Every innovation is designed to serve you better.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Security",
      description:
        "Advanced safety protocols and real-time monitoring ensure peace of mind.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description:
        "We constantly push technology boundaries to redefine mobility.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainability",
      description:
        "Reducing carbon footprint through eco-friendly ride options and green initiatives.",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Visionary leader transforming urban mobility for communities worldwide.",
      image: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Tech innovator building scalable, cutting-edge ride-sharing platforms.",
      image: "👨‍💻",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      bio: "Expert in logistics, ensuring seamless ride experiences.",
      image: "👩‍💼",
    },
    {
      name: "David Kim",
      role: "Head of Safety",
      bio: "Dedicated to rider and driver safety through rigorous protocols.",
      image: "👨‍💼",
    },
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "Started with a bold vision." },
    { year: "2021", title: "1 Million Rides", description: "Our first milestone achieved." },
    { year: "2022", title: "50 Cities", description: "Expanded across North America." },
    { year: "2023", title: "Carbon Neutral", description: "Green initiatives implemented." },
    { year: "2024", title: "Global Expansion", description: "Launching in international markets." },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/15 to-background">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl mb-6">
            About <span className="text-primary">LoopRide</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting communities through safe, sustainable, and innovative transportation since 2020.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.img
            src={teamImage}
            alt="Our team"
            className="w-full rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Deliver safe, reliable, and eco-friendly transportation while empowering drivers and delighting riders.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To become the most trusted and sustainable transportation platform globally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2
            className="text-3xl font-bold text-foreground sm:text-4xl mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            The principles guiding everything we do
          </motion.p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2
            className="text-3xl font-bold text-foreground sm:text-4xl mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Meet Our Leadership Team
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            Experienced leaders driving innovation and safety
          </motion.p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-tr from-primary to-primary/50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Our Journey
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            Key milestones that define our growth
          </motion.p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="flex items-start space-x-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-primary to-primary/50 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                {m.year}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {m.title}
                </h3>
                <p className="text-muted-foreground">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/45">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether you're a rider seeking convenience or a driver seeking opportunity, become part of the mobility revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 ">
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
        </motion.div>
      </section>
    </div>
  );
}
