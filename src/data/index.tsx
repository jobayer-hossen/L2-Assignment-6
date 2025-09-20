import { Clock, CreditCard, Shield, Smartphone } from "lucide-react";

export const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Availability",
    description:
      "Book rides anytime, anywhere with our round-the-clock service.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe & Secure",
    description:
      "Verified drivers, GPS tracking, and emergency support for your safety.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Easy Payments",
    description: "Multiple payment options including cards, wallets, and cash.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Smart Booking",
    description: "Intuitive app interface with real-time tracking and updates.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Book Your Ride",
    description: "Enter your pickup and destination locations in the app.",
  },
  {
    step: "02",
    title: "Match with Driver",
    description: "Get matched with a nearby verified driver instantly.",
  },
  {
    step: "03",
    title: "Track & Ride",
    description: "Track your driver's arrival and enjoy a safe ride.",
  },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Excellent service! Always on time and professional drivers.",
    location: "New York",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Best ride booking app I've used. Clean cars and fair prices.",
    location: "San Francisco",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "Safe and reliable. I use it daily for my work commute.",
    location: "Chicago",
  },
];
