import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className=" text-gray-700 dark:text-gray-300 relative overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand & Contact */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                LoopRide
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              LoopRide connects riders with trusted drivers, ensuring safe, fast, 
              and affordable rides. Whether commuting or exploring, we are always there for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                support@loopride.com
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                123 Main Street, City, Country
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Features", "Contact", "FAQ"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Safety Guidelines"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>&copy; 2024 LoopRide. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
