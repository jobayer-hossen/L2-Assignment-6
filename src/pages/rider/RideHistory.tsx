/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedBackModal from "@/components/FeedBackModal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetRideHistoryQuery } from "@/redux/features/ride/riders.api";
import { useState } from "react";

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetRideHistoryQuery({ page, limit: 10 });

  const rides = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <>
      {!isLoading && rides.length ? (
        <div className="space-y-4 border p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Ride History</h2>

          {/* Ride Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride: any, index: number) => (
                <TableRow key={ride._id}>
                  <TableCell>{(page - 1) * 10 + (index + 1)}</TableCell>
                  <TableCell className="font-medium">
                    {ride?.pickupLocation?.address}
                  </TableCell>
                  <TableCell>{ride?.destination?.address}</TableCell>
                  <TableCell>
                    {formatDate(ride?.timestampsLog?.requestedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ride?.rideStatus === "COMPLETED"
                          ? "secondary"
                          : ride?.rideStatus === "CANCELLED"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {ride?.rideStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      {ride?.timestampsLog?.acceptedAt && (
                        <p>
                          ✅ Accepted:{" "}
                          {formatDate(ride.timestampsLog.acceptedAt)}
                        </p>
                      )}
                      {ride?.timestampsLog?.pickedUpAt && (
                        <p>
                          🚗 Picked: {formatDate(ride.timestampsLog.pickedUpAt)}
                        </p>
                      )}
                      {ride?.timestampsLog?.completedAt && (
                        <p>
                          🏁 Completed:{" "}
                          {formatDate(ride.timestampsLog.completedAt)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {["REQUESTED", "ACCEPTED"].includes(ride?.rideStatus) ? (
                      <FeedBackModal id={ride?._id}>Cancel</FeedBackModal>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        No Action
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {meta?.totalPage > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <p>
                Page {page} of {meta.totalPage}
              </p>
              <Button
                variant="outline"
                size="sm"
                disabled={page === meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-135 w-full rounded-md" />
        </div>
      )}
    </>
  );
}
