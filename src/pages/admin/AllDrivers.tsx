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
  useAllDriversQuery,
  useUpdateDriverApprovalStatusMutation,
} from "@/redux/features/admin/admin.api";
import { toast } from "sonner";

export default function AllDrivers() {
  const { data, isLoading } = useAllDriversQuery(undefined);
  const [updateApprovalStatus] = useUpdateDriverApprovalStatusMutation();

  if (isLoading)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;

  const handleChangeApprovalStatus = async (id: string, status: string) => {
    const newDriverStatus = status === "APPROVED" ? "PENDING" : "APPROVED";

    const updateData = { id, driverStatus: newDriverStatus };

    console.log(updateData);

    try {
      await updateApprovalStatus(updateData).unwrap();
      toast.success(`Driver ${newDriverStatus} Successfully`);
    } catch (error) {
      console.error("Failed to update:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-xl">
      {/* Users Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Number Plate</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Approval Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.data?.map((user: any, index: number) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.licenseNumber}</TableCell>
              <TableCell>{user.vehicleInfo.vehicleType}</TableCell>
              <TableCell className="capitalize">
                {user.vehicleInfo.vehicleNumberPlate}
              </TableCell>

              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        className={`${
                          user.driverStatus === "APPROVED"
                            ? "bg-green-400"
                            : ""
                        }`}
                      >
                        {user.driverStatus}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {user.driverStatus === "APPROVED"
                            ? "Approve this driver?"
                            : "Decline this user?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {user.driverStatus === "APPROVED"
                            ? "This will prevent the driver from accessing the system."
                            : "This will allow the driver to access the system again."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleChangeApprovalStatus(
                              user?._id,
                              user?.driverStatus
                            )
                          }
                        >
                          {user.driverStatus === "APPROVED"
                            ? "Decline Approval"
                            : "Confirm Approved"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
