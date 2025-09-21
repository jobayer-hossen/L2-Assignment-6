import RideHistory from "@/pages/rider/RideHistory";
import RiderProfileManagement from "@/pages/rider/RiderProfileManagement";
import RequestRidePage from "@/pages/rider/RequestRidePage";
import type { ISidebarItem } from "@/types";

export const riderSidebarItems: ISidebarItem[] = [
  // {
  //   title: "Request Ride",
  //   items: [
  //     {
  //       title: "Requested Rides",
  //       url: "/ride-request",
  //       component: RequestRidePage,
  //     },
  //   ],
  // },
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
