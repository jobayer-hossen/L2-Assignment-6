import AllDrivers from "@/pages/admin/AllDrivers";
import AllUsers from "@/pages/admin/AllUsers";
import Analytics from "@/pages/admin/Analytics";
import UpdateAdminProfile from "@/pages/admin/UpdateAdminProfile";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "All Users",
    items: [
      {
        title: "Manage Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
  {
    title: "All Drivers",
    items: [
      {
        title: "Manage Drivers",
        url: "/admin/all-drivers",
        component: AllDrivers,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Update Your Profile",
        url: "/admin/profile",
        component: UpdateAdminProfile,
      },
    ],
  },
];
