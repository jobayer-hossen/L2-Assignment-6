import DriverAnalytics from "@/pages/driver/DriverAnalytics";
import DriverUpdateProfile from "@/pages/driver/DriverUpdateProfile";
import RideStatus from "@/pages/driver/RideStatus";
import VehicleStatus from "@/pages/driver/VehicleStatus";
import type { ISidebarItem } from "@/types";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverAnalytics,
      },
    ],
  },
  {
    title: "Vehicles",
    items: [
      {
        title: "Vehicle Status",
        url: "/driver/status",
        component: VehicleStatus,
      },
    ],
  },
  {
    title: "Rides",
    items: [
      {
        title: "Ride Status",
        url: "/driver/ride-status",
        component: RideStatus,
      },
    ],
  },

  {
    title: "Manage profile",
    items: [
      {
        title: "Profile",
        url: "/driver/profile",
        component: DriverUpdateProfile,
      },
    ],
  },
];
