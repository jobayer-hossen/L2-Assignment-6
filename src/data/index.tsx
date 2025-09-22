import { Clock, CreditCard, Shield, Smartphone } from "lucide-react";

export const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Instant Booking",
    description:
      "Request a ride in seconds and get matched with the nearest driver instantly.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Trusted Drivers",
    description:
      "All drivers are verified and rated to ensure a reliable and secure journey.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Flexible Payments",
    description:
      "Pay your way with cards, mobile wallets, or cash at the end of the trip.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Real-Time Tracking",
    description:
      "Track your driver’s location live and stay updated throughout your trip.",
  },
];


export const steps = [
  {
    step: "01",
    title: "Set Your Destination",
    description: "Open the app, choose where you want to go, and confirm your pickup point.",
  },
  {
    step: "02",
    title: "Choose Your Ride",
    description: "Select from affordable, premium, or shared rides that best fit your needs.",
  },
  {
    step: "03",
    title: "Enjoy the Journey",
    description: "Track your driver in real time and arrive at your destination safely.",
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
