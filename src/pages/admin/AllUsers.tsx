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
import { DeleteConfirmation } from "@/components/ui/DeleteConfiramtion";
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
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { toast } from "sonner";

export default function AllUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useAllUsersQuery({
    searchTerm: search,
    role: roleFilter === "all" ? "" : roleFilter,
    page,
    limit: 10,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [updateActiveStatus] = useUpdateUserStatusMutation();

  const users = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    console.log("handle delete clicked", id);
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockUnblock = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    const updateStatus = { id, isActive: newStatus };

    try {
      await updateActiveStatus(updateStatus).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  if (error) return <p className="text-red-500">Failed to load users</p>;

  return (
    <div className="space-y-4 border p-4 rounded-xl">
      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
      </div>

      {/* Users Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: number) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell className="capitalize">{user?.role}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.isActive === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isActive}
                </span>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant={
                        user.isActive === "ACTIVE" ? "destructive" : "default"
                      }
                    >
                      {user.isActive === "ACTIVE" ? "BLOCK" : "UNBLOCK"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {user.isActive === "ACTIVE"
                          ? "Block this user?"
                          : "Unblock this user?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {user.isActive === "ACTIVE"
                          ? "This will prevent the user from accessing the system."
                          : "This will allow the user to access the system again."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleBlockUnblock(user?._id, user?.isActive)
                        }
                      >
                        {user.isActive === "ACTIVE"
                          ? "Confirm Block"
                          : "Confirm Unblock"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <DeleteConfirmation
                  onConfirm={() => {
                    handleDelete(user?._id);
                  }}
                >
                  <Button
                    size="sm"
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                </DeleteConfirmation>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <p>
          Page {meta?.page} of {meta?.totalPage}
        </p>
        <Button
          size="sm"
          variant="outline"
          disabled={page === meta?.totalPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
