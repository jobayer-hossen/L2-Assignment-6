import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Register";
import Contact from "@/pages/Contact";
import ErrorPage from "@/pages/ErrorPage";
import Features from "@/pages/Features";

import { role } from "@/constant/role";
import VehicleRegistration from "@/pages/driver/DriverRegistration";
import Home from "@/pages/Home";
import RequestRidePage from "@/pages/rider/RequestRidePage";

import RideDetailsPage from "@/pages/rider/RideDetailsPage";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoute";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";
import PickARide from "@/pages/driver/PickARide";
import Faq from "@/pages/Faq";
import RideDetailsRider from "@/pages/rider/RideDetailsRider";
import VerifyOtpForm from "@/components/modules/authentication/VerifyOtpForm";
import RideDetailsAdmin from "@/pages/admin/RideDetailsAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "features", Component: Features },
      { path: "contact", Component: Contact },
      { path: "faq", Component: Faq },
      {
        path: "ride-request",
        Component: withAuth(RequestRidePage, role.rider as TRole),
      },
      { path: "/driver/ride-details/:rideId", Component: RideDetailsPage },
      { path: "/rider/ride-details/:rideId", Component: RideDetailsRider },
      { path: "/admin/ride-details/", Component: RideDetailsAdmin },
      { path: "/pick-a-ride", Component: PickARide },
      {
        path: "/be-a-driver",
        Component: withAuth(VehicleRegistration, role.rider as TRole),
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/rider",
    Component: withAuth(DashboardLayout, role.rider as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/rider/history" /> },
      ...generateRoutes(riderSidebarItems),
    ],
  },

  {
    path: "/driver",
    Component: withAuth(DashboardLayout, role.driver as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/driver/analytics" /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/register",
    Component: SignUp,
  },
  {
    path: "/verify",
    Component: VerifyOtpForm,
  },
]);
