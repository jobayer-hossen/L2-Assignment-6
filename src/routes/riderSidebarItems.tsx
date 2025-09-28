import RideHistory from "@/pages/rider/RideHistory";
import RiderProfileManagement from "@/pages/rider/RiderProfileManagement";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Ride History",
        url: "/rider/history",
        component: RideHistory,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Manage Profile",
        url: "/rider/profile",
        component: RiderProfileManagement,
      },
    ],
  },
];
