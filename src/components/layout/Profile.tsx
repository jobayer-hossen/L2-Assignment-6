import { BookOpenIcon, ChevronDownIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Profile() {
  const [logout] = useLogoutMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  // const { data: driverInfo } = useDriverInfoQuery(undefined);
  // const activeStatus = driverInfo?.data[0]?.isOnline;

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Log out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <div className="relative">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Kelly King"
              />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
          </div>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 z-1000">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {userInfo?.data?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {userInfo?.data?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Help</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Wallet</span>
          </DropdownMenuItem> */}

          {userInfo?.data?.role === "ADMIN" && (
            <Link to="admin">
              <DropdownMenuItem>
                <BookOpenIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}

          {userInfo?.data?.role === "SUPER_ADMIN" && (
            <Link to="admin">
              <DropdownMenuItem>
                <BookOpenIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          {userInfo?.data?.role === "DRIVER" && (
            <Link to="driver">
              <DropdownMenuItem>
                <BookOpenIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          {userInfo?.data?.role === "RIDER" && (
            <Link to="rider">
              <DropdownMenuItem>
                <BookOpenIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>

        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
