import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { scrollToTop } from "@/hooks/scroll";

const faqs = [
  {
    question: "How do I book a ride on LoopRide?",
    answer:
      "Booking a ride is simple! Just enter your pickup location, destination, and select your preferred ride type. Confirm, and a driver will be assigned to you instantly.",
  },
  {
    question: "Can I schedule rides in advance?",
    answer:
      "Yes! LoopRide allows you to schedule rides ahead of time so you can plan your trips efficiently.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, digital wallets, and cash payments. You can also split fares with friends for shared rides.",
  },
  {
    question: "Is LoopRide safe for riders?",
    answer:
      "Absolutely. We provide real-time tracking, driver verification, emergency buttons, and 24/7 support to ensure rider safety.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "If you want to join LoopRide as a driver, simply register via our partner sign-up page and complete the verification process.",
  },
];

export default function FAQPage() {
   scrollToTop()
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/15 to-background py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about LoopRide, our services, and how to
          get started.
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-background shadow-lg rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left text-lg font-semibold hover:bg-muted/20 transition-colors"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="px-6 pb-4 text-muted-foreground text-base"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 text-center px-4"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Still have questions?
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Reach out to our support team anytime — we’re here to help!
        </p>
        <button className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
}
