/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CancelModal from "@/components/CancelModal";
import FeedbackModal from "@/components/FeedBackModal";

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TruncatedCell = ({
  text,
  maxLength = 30,
}: {
  text: string;
  maxLength?: number;
}) => {
  if (!text) return <span className="text-gray-500 italic">—</span>;

  const isLong = text.length > maxLength;
  const displayText = isLong ? text.slice(0, maxLength) + "..." : text;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help font-medium text-foreground">
            {displayText}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs break-words bg-gray-900 text-white dark:bg-gray-800"
        >
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetRideHistoryQuery({ page, limit: 10 });

  const rides = data?.data?.data || [];
  const meta = data?.data?.meta;

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
        <div className="text-6xl">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          No ride history yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
          Your past rides will appear here once you start requesting them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Ride History
        </h2>
        <Badge variant="outline" className="text-sm">
          {rides.length} rides this page
        </Badge>
      </div>

      {/* Ride Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-64">Pickup</TableHead>
              <TableHead className="w-64">Destination</TableHead>
              <TableHead className="w-48">Requested At</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-56">Timeline</TableHead>
              <TableHead className="w-64">Feedback</TableHead>
              <TableHead className="w-32 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride: any, index: number) => (
              <TableRow
                key={ride._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <TableCell className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  {(page - 1) * 10 + (index + 1)}
                </TableCell>
                <TableCell
                 onClick={() => window.location.href = `/rider/ride-details/${ride._id}`} 
                >
                  <TruncatedCell
                    text={ride?.pickupLocation?.address}
                    maxLength={25}
                  />
                </TableCell>
                <TableCell
                 onClick={() => window.location.href = `/rider/ride-details/${ride._id}`} 
                >
                  <TruncatedCell
                    text={ride?.destination?.address}
                    maxLength={25}
                  />
                </TableCell>
                <TableCell 
                 onClick={() => window.location.href = `/rider/ride-details/${ride._id}`} 
                className="whitespace-nowrap text-sm">
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
                    className="px-3 py-1 text-xs font-medium"
                  >
                    {ride?.rideStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                    {ride?.timestampsLog?.acceptedAt && (
                      <p className="flex items-center gap-1">
                        <span>✅</span> Accepted:{" "}
                        {formatDate(ride.timestampsLog.acceptedAt)}
                      </p>
                    )}
                    {ride?.timestampsLog?.pickedUpAt && (
                      <p className="flex items-center gap-1">
                        <span>🚗</span> Picked Up:{" "}
                        {formatDate(ride.timestampsLog.pickedUpAt)}
                      </p>
                    )}
                    {ride?.timestampsLog?.completedAt && (
                      <p className="flex items-center gap-1">
                        <span>🏁</span> Completed:{" "}
                        {formatDate(ride.timestampsLog.completedAt)}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <TruncatedCell text={ride.feedback} maxLength={9} />
                </TableCell>

                <TableCell>
                  {ride?.rideStatus === "REQUESTED" && (
                    <CancelModal rideId={ride?._id}>Cancel</CancelModal>
                  )}

                  {ride?.rideStatus === "COMPLETED" && (
                    <FeedbackModal rideId={ride?._id}>Feedback</FeedbackModal>
                  )}

                  {ride?.rideStatus === "ACCEPTED" ||
                    ride?.rideStatus === "PICKED_UP" ||
                    (ride?.rideStatus === "IN_TRANSIT" && (
                      <Button variant="outline" size="sm" disabled>
                        No Action
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta?.totalPage > 1 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="transition-transform hover:scale-105"
          >
            ← Previous
          </Button>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page <span className="font-bold">{page}</span> of {meta.totalPage}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled={page === meta.totalPage}
            onClick={() => setPage((p) => p + 1)}
            className="transition-transform hover:scale-105"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}
