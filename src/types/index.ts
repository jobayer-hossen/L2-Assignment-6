import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface ApiErrorResponse {
  data: {
    message: string;
    success: boolean;
  };
}
