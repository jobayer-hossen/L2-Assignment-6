import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { ModeToggle } from "./mode-toggle";
import Profile from "./Profile";
import { motion } from "framer-motion";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-16">
        {/* Left side */}
        <div className="flex items-center gap-6">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40 p-1 md:hidden">
              <NavigationMenu className="max-w-none">
                <NavigationMenuList className="flex-col gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className="block w-full py-2 px-3 rounded hover:bg-primary/10 transition"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl flex items-center gap-3 font-bold text-primary dark:text-primary-light hover:text-primary/90 transition group relative"
          >
            <motion.div
              className="relative"
              animate={{
                x: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.img
                src="https://cdn-icons-png.freepik.com/512/10028/10028767.png?ga=GA1.1.1697682617.1758554927"
                alt="logo"
                className="w-[40px]"
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2 },
                }}
              />
            </motion.div>
            <span className=" transition-all duration-300">
              LoopRide
            </span>
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-4">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className="font-medium py-1.5 px-2 rounded hover:bg-primary/10 transition"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {data?.data?.role === "RIDER" && (
            <>
              <Link
                to="/ride-request"
                className="font-medium py-1.5 px-2 rounded hover:bg-primary/50 transition bg-primary/30"
              >
                Request a Ride
              </Link>
              <Link
                to="/be-a-driver"
                className="font-medium py-1.5 px-2 rounded hover:bg-primary/50 transition bg-primary/10"
              >
                Be a Driver
              </Link>
            </>
          )}
          {data?.data?.role === "ADMIN" ||
            (data?.data?.role === "SUPER_ADMIN" && (
              <>
                <Link
                  to="/admin/analytics"
                  className="font-medium py-1.5 px-2 rounded hover:bg-primary/50 transition bg-primary/30"
                >
                  Dashboard
                </Link>
              </>
            ))}

          {data?.data?.role === "DRIVER" && (
            <>
              <Link
                to="/pick-a-ride"
                className="font-medium py-1.5 px-2 rounded hover:bg-primary/50 transition bg-primary/30"
              >
                Pick a ride
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {data?.data?.email ? (
            <Profile />
          ) : (
            <Button asChild size="sm" className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
