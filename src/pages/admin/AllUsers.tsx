/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/admin.api";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { UserX, UserCheck, Loader2 } from "lucide-react";

export default function AllUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data, isLoading, error } = useAllUsersQuery({
    searchTerm: search,
    role: roleFilter === "all" ? "" : roleFilter,
    page,
    limit: 10,
  });

  const [updateActiveStatus] = useUpdateUserStatusMutation();

  const users = data?.data || [];
  const meta = data?.meta;

  const handleBlockUnblock = useCallback(
    async (id: string, currentStatus: string) => {
      setUpdatingId(id);
      const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      try {
        await updateActiveStatus({ id, isActive: newStatus }).unwrap();
        toast.success(
          `✅ User ${
            newStatus === "ACTIVE" ? "unblocked" : "blocked"
          } successfully`
        );
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("❌ Something went wrong");
      } finally {
        setUpdatingId(null);
      }
    },
    [updateActiveStatus]
  );

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Skeleton className="h-135 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-medium">⚠️ Failed to load users</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="w-full mb-7">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center md:text-left">
          Manage Users
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="">
            <TableRow className="hover:bg-muted transition-colors duration-150">
              <TableHead className="w-12 text-muted-foreground">#</TableHead>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Joined</TableHead>
              <TableHead className="text-center text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user: any, index: number) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-muted transition-colors duration-150"
                >
                  <TableCell className="font-mono text-sm text-gray-500">
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {user.name || "—"}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "default"
                          : user.role === "moderator"
                          ? "secondary"
                          : "outline"
                      }
                      className="capitalize px-2.5 py-0.5 text-xs font-medium"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.isActive === "ACTIVE" ? "default" : "destructive"
                      }
                      className="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {user.isActive === "ACTIVE" ? "Active" : "Blocked"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2 py-2">
                    {/* Block/Unblock Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant={
                            user.isActive === "ACTIVE"
                              ? "destructive"
                              : "outline"
                          }
                          disabled={updatingId === user._id}
                          className="h-8 w-8 transition-transform hover:scale-105 cursor-pointer"
                        >
                          {updatingId === user._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : user.isActive === "ACTIVE" ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {user.isActive === "ACTIVE"
                              ? "Block User?"
                              : "Unblock User?"}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {user.isActive === "ACTIVE"
                              ? "This user will no longer be able to log in or access any features."
                              : "This user will regain full access to the system."}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleBlockUnblock(user?._id, user?.isActive)
                            }
                            className={
                              user.isActive === "ACTIVE"
                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                                : ""
                            }
                          >
                            {user.isActive === "ACTIVE"
                              ? "Confirm Block"
                              : "Confirm Unblock"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="py-8">
                    <p className="text-gray-500 text-lg">No users found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
          <p className="font-mono text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total || 0)}
            </span>{" "}
            of <span className="font-medium">{meta.total || 0}</span> users
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="transition-all"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600 px-3">
              Page {meta.page} of {meta.totalPage}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page >= meta.totalPage || isLoading}
              onClick={() => setPage((p) => p + 1)}
              className="transition-all"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
