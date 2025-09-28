/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MapPin, Clock, User } from "lucide-react";
import {
  useAllRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/admin/admin.api";

export default function AllRides() {
  const [search] = useState("");
  const [statusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useAllRidesQuery({
    searchTerm: search,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  });

  const [updateRideStatus] = useUpdateRideStatusMutation();

  const rides = data?.data.data || [];
  const meta = data?.data.meta || { page: 1, totalPage: 1, total: 0 };

  const filteredRides = useMemo(() => {
    return rides.filter((ride: any) => {
      const matchesSearch =
        search === "" ||
        ride.riderId?.toLowerCase().includes(search.toLowerCase()) ||
        ride.driverId?.toLowerCase().includes(search.toLowerCase()) ||
        ride.pickupLocation.address
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ride.destination.address?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || ride.rideStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rides, search, statusFilter]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "CANCELLED":
        return "destructive";
      case "REQUESTED":
        return "secondary";
      case "ACCEPTED":
        return "secondary";
      case "ONGOING":
        return "default";
      default:
        return "outline";
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "—";
    const date = parseISO(isoString);
    return `${formatDistanceToNow(date, { addSuffix: true })}`;
  };

  const handleStatusChange = async (rideId: string, newStatus: string) => {
    try {
      await updateRideStatus({ id: rideId, rideStatus: newStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update ride status", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-12 w-full rounded-lg mb-4" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6  rounded-xl shadow-sm ">
      {/* Header Section */}
      <div className="w-full mb-7">
        <h1 className="text-4xl font-bold text-foreground mb-2 text-center md:text-left">
          All Rides Management
        </h1>
      </div>

      {/* Rides Table */}
      <div className="rounded-lg border border-gray-400 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-muted-foreground">#</TableHead>
              <TableHead className="text-muted-foreground">Rider</TableHead>
              <TableHead className="text-muted-foreground">Driver</TableHead>
              <TableHead className="text-muted-foreground">
                Pickup → Destination
              </TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Requested</TableHead>
              <TableHead className="text-muted-foreground text-center">
                Duration
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRides.length > 0 ? (
              filteredRides.map((ride: any, index: number) => {
                const { timestampsLog } = ride;
                const duration =
                  timestampsLog?.completedAt && timestampsLog?.requestedAt
                    ? Math.round(
                        (new Date(timestampsLog.completedAt).getTime() -
                          new Date(timestampsLog.requestedAt).getTime()) /
                          60000
                      )
                    : null;

                return (
                  <TableRow
                    key={ride._id}
                    className="hover:bg-muted transition-colors duration-150"
                  >
                    <TableCell className="font-mono text-sm text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        (window.location.href = `/admin/ride-details/`)
                      }
                      className="text-xs font-mono text-blue-600"
                    >
                      {ride.riderId?.slice(-6)}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        (window.location.href = `/admin/ride-details`)
                      }
                      className="text-xs font-mono text-purple-600"
                    >
                      {ride.driverId?.slice(-6)}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        (window.location.href = `/admin/ride-details`)
                      }
                      className="text-sm max-w-xs"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {ride.pickupLocation?.address}
                          </span>
                        </div>
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {ride.destination?.address}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(ride.rideStatus)}
                        className="px-2.5 py-0.5 text-xs"
                      >
                        {ride.rideStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(ride.timestampsLog?.requestedAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      {duration ? (
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{duration} min</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Select
                        onValueChange={(val) =>
                          handleStatusChange(ride._id, val)
                        }
                        defaultValue={ride.rideStatus}
                        disabled={
                          ride.rideStatus === "COMPLETED" ||
                          ride.rideStatus === "CANCELLED"
                        } // lock when finished
                      >
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue placeholder="Change" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* REQUESTED → ACCEPTED / CANCELLED */}
                          <SelectItem
                            value="ACCEPTED"
                            disabled={ride.rideStatus !== "REQUESTED"}
                          >
                            Accepted
                          </SelectItem>
                          <SelectItem
                            value="CANCELLED"
                            disabled={
                              ![
                                "REQUESTED",
                                "ACCEPTED",
                                "PICKED_UP",
                                "IN_TRANSIT",
                              ].includes(ride.rideStatus)
                            }
                          >
                            Cancelled
                          </SelectItem>

                          {/* ACCEPTED → PICKED_UP */}
                          <SelectItem
                            value="PICKED_UP"
                            disabled={ride.rideStatus !== "ACCEPTED"}
                          >
                            Picked Up
                          </SelectItem>

                          {/* PICKED_UP → IN_TRANSIT */}
                          <SelectItem
                            value="IN_TRANSIT"
                            disabled={ride.rideStatus !== "PICKED_UP"}
                          >
                            In Transit
                          </SelectItem>

                          {/* IN_TRANSIT → COMPLETED */}
                          <SelectItem
                            value="COMPLETED"
                            disabled={ride.rideStatus !== "IN_TRANSIT"}
                          >
                            Completed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="py-8">
                    <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-lg font-medium">
                      No rides found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your search or filter.
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
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * limit + 1}–{Math.min(page * limit, meta.total || 0)}
            </span>{" "}
            of <span className="font-medium">{meta.total || 0}</span> rides
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
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
              disabled={page >= meta.totalPage}
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
