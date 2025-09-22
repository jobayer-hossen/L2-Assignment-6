import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import * as React from "react";
import { Link } from "react-router";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useDriverInfoQuery } from "@/redux/features/driver/driver.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  const [logout] = useLogoutMutation();
  // const { data: userInfo } = useUserInfoQuery(undefined);
  // const { data: driverInfo } = useDriverInfoQuery(undefined);
  // const activeStatus = driverInfo?.data[0]?.isOnline;

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Log out successfully");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Link to="/" className="flex items-center space-x-2 mb-4">
          <img
            src="https://cdn-icons-png.freepik.com/512/10028/10028767.png?ga=GA1.1.1697682617.1758554927"
            alt="logo"
            className="w-[40px]"
          />
          <span className="font-bold text-2xl text-primary dark:text-primary-light">
            LoopRide
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />

      <div className="w-full flex justify-center mb-6">
        <Button
          onClick={() => handleLogout()}
          size="lg"
          className="bg-primary hover:shadow-primary text-lg px-8 py-3 cursor-pointer"
        >
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </Sidebar>
  );
}
