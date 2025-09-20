import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car,
  CreditCard,
  HelpCircle,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      faqs: [
        {
          question: "What is RideShare and how does it work?",
          answer:
            "RideShare is a ride-booking platform that connects passengers with nearby drivers. Simply open the app, enter your destination, request a ride, and get matched with a driver in your area.",
        },
        {
          question: "In which cities is RideShare available?",
          answer:
            "RideShare is currently available in over 50 cities across North America, with plans to expand internationally. Check our app to see if we're available in your area.",
        },
        {
          question: "How do I create an account?",
          answer:
            "Download the RideShare app, tap 'Sign Up', and follow the prompts to create your account using your email, phone number, and basic information.",
        },
        {
          question: "Is RideShare available 24/7?",
          answer:
            "Yes! RideShare operates 24/7 in most cities, though driver availability may vary during late night and early morning hours.",
        },
      ],
    },
    {
      title: "For Riders",
      icon: <Users className="w-5 h-5" />,
      faqs: [
        {
          question: "How do I book a ride?",
          answer:
            "Open the app, enter your pickup location and destination, select your ride type, confirm your pickup location, and tap 'Request Ride'. You'll be matched with a nearby driver.",
        },
        {
          question: "Can I schedule a ride in advance?",
          answer:
            "Yes! You can schedule rides up to 30 days in advance. Select 'Schedule' when booking and choose your preferred pickup time.",
        },
        {
          question: "What if I need to cancel my ride?",
          answer:
            "You can cancel your ride through the app. Cancellation fees may apply if you cancel after the driver has already started heading to your location.",
        },
        {
          question: "How do I track my ride?",
          answer:
            "Once matched with a driver, you can track their location in real-time on the map in your app. You'll also receive updates about their estimated arrival time.",
        },
        {
          question: "Can I bring pets or luggage?",
          answer:
            "Small pets in carriers are generally allowed. For larger pets or significant luggage, please contact your driver or consider booking a larger vehicle type.",
        },
      ],
    },
    {
      title: "For Drivers",
      icon: <Car className="w-5 h-5" />,
      faqs: [
        {
          question: "How do I become a RideShare driver?",
          answer:
            "Apply through our driver portal, complete the background check, provide required documents (license, insurance, vehicle registration), and pass a vehicle inspection.",
        },
        {
          question: "What are the vehicle requirements?",
          answer:
            "Vehicles must be 2010 or newer, have 4 doors, pass safety inspection, and meet local regulations. Specific requirements may vary by city.",
        },
        {
          question: "How do I get paid?",
          answer:
            "Earnings are automatically calculated after each ride. You can cash out instantly or receive weekly automatic deposits to your bank account.",
        },
        {
          question: "Can I choose when to drive?",
          answer:
            "Absolutely! Drive on your own schedule. You can go online and offline whenever you want and drive as much or as little as you prefer.",
        },
        {
          question: "What insurance coverage do I have while driving?",
          answer:
            "RideShare provides comprehensive insurance coverage while you're online and during rides, including liability, collision, and comprehensive coverage.",
        },
      ],
    },
    {
      title: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
      faqs: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash in select markets.",
        },
        {
          question: "How is the fare calculated?",
          answer:
            "Fares are calculated based on time, distance, demand, and local regulations. You'll see an upfront price estimate before booking.",
        },
        {
          question: "Can I split the fare with friends?",
          answer:
            "Yes! Use the 'Split Fare' feature in the app to divide the cost among multiple passengers. Everyone needs to have the RideShare app.",
        },
        {
          question: "Do I need to tip my driver?",
          answer:
            "Tipping is not required but appreciated. You can add a tip through the app after your ride or give cash directly to your driver.",
        },
        {
          question: "What if I'm charged incorrectly?",
          answer:
            "If you believe you were charged incorrectly, contact our support team through the app. We'll review your trip and adjust the fare if necessary.",
        },
      ],
    },
    {
      title: "Safety",
      icon: <Shield className="w-5 h-5" />,
      faqs: [
        {
          question: "How does RideShare ensure my safety?",
          answer:
            "We conduct background checks on all drivers, provide real-time ride tracking, emergency button access, and 24/7 support. You can also share your trip details with trusted contacts.",
        },
        {
          question: "What should I do in an emergency?",
          answer:
            "Use the emergency button in the app to contact local authorities, or call 911 directly. The app will share your location and trip details with emergency services.",
        },
        {
          question: "How do I verify my driver?",
          answer:
            "Check that the license plate, car make/model, and driver photo match what's shown in your app. Drivers should also confirm your name before starting the trip.",
        },
        {
          question: "Can I report a safety concern?",
          answer:
            "Yes, you can report safety concerns through the app or contact our safety team directly. We take all reports seriously and investigate thoroughly.",
        },
        {
          question: "What if I left something in the car?",
          answer:
            "Use the 'I lost an item' feature in the app to contact your driver directly. If unsuccessful, our support team can help coordinate the return of your item.",
        },
      ],
    },
  ];

  // Filter FAQs based on search term
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers to common questions about RideShare. Can't find what
              you're looking for? Contact our support team for personalized
              assistance.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm && (
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                {filteredCategories.reduce(
                  (total, category) => total + category.faqs.length,
                  0
                )}{" "}
                results for "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <Badge variant="secondary" className="ml-3 bg-muted">
                    {category.faqs.length} questions
                  </Badge>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border border-border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any FAQs matching "{searchTerm}". Try different
                keywords or contact our support team.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Our support team is here to help 24/7. Contact us for personalized
            assistance with any questions not covered in our FAQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
