import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-foreground sm:text-4xl mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Get Started?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join millions of riders who trust <span className="text-primary font-semibold">LoopRide</span> for their daily transportation needs.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3 cursor-pointer"
          >
            Download App
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 cursor-pointer border-primary-foreground bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
