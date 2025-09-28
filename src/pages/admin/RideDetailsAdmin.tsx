import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Clock,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import { scrollToTop } from "@/hooks/scroll";
import { useGetRideAllDetailsForAdminQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";

const RideDetailsAdmin = () => {
  scrollToTop();
  const [currentPage, setCurrentPage] = useState(1);
  
  const {
    data: rideData,
    isLoading,
    isError,
  } = useGetRideAllDetailsForAdminQuery({ page: currentPage, limit: 10 });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !rideData?.data) {
    return <div className="text-center text-red-500">No rides found</div>;
  }

  const { data: rides, meta } = rideData.data;

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/admin/all-rides" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  All Ride Details
                </h1>
                <p className="text-muted-foreground">
                  Total Rides: {meta.total}
                </p>
              </div>
            </div>
          </div>

          {/* Rides List */}
          <div className="space-y-6">
            {rides.map((ride: any, index: number) => {
              const distance =
                ride.pickupLocation && ride.destination
                  ? getDistanceFromLatLonInKm(
                      ride.pickupLocation.lati,
                      ride.pickupLocation.long,
                      ride.destination.lati,
                      ride.destination.long
                    ).toFixed(2) + " km"
                  : "N/A";

              return (
                <motion.div
                  key={ride._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          Ride ID: {ride._id}
                        </span>
                        <Badge
                          variant={
                            ride.rideStatus === "COMPLETED"
                              ? "secondary"
                              : ride.rideStatus === "CANCELLED"
                              ? "destructive"
                              : "default"
                          }
                          className="px-3 py-1 text-xs font-medium"
                        >
                          {ride.rideStatus}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Trip Information */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">
                                Pickup Location
                              </p>
                              <p className="font-medium text-sm">
                                {ride.pickupLocation?.address}
                              </p>
                              {ride.timestampsLog?.pickedUpAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Picked up at{" "}
                                  {formatDate(ride.timestampsLog.pickedUpAt)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">
                                Destination
                              </p>
                              <p className="font-medium text-sm">
                                {ride.destination?.address}
                              </p>
                              {ride.timestampsLog?.completedAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Dropped off at{" "}
                                  {formatDate(ride.timestampsLog.completedAt)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Distance</p>
                              <p className="font-medium">{distance}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Ride Created
                              </p>
                              <p className="font-medium">
                                {formatDate(ride.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-4">
                          {/* IDs */}
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Rider ID:
                              </span>{" "}
                              <span className="font-medium">
                                {ride.riderId}
                              </span>
                            </div>
                            {ride.driverId && (
                              <div>
                                <span className="text-muted-foreground">
                                  Driver ID:
                                </span>{" "}
                                <span className="font-medium">
                                  {ride.driverId}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Cancellation Info */}
                          {ride.rideStatus === "CANCELLED" && (
                            <div className="bg-red-50 dark:bg-red-950 p-3 rounded-md space-y-1 text-sm">
                              <p className="font-medium text-red-600 dark:text-red-400">
                                Cancellation Details
                              </p>
                              {ride.cancelReason && (
                                <p>
                                  <span className="text-muted-foreground">
                                    Reason:
                                  </span>{" "}
                                  {ride.cancelReason}
                                </p>
                              )}
                              {ride.cancelledBy && (
                                <p>
                                  <span className="text-muted-foreground">
                                    Cancelled By:
                                  </span>{" "}
                                  {ride.cancelledBy}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Feedback */}
                          {ride.feedback && (
                            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md space-y-1 text-sm">
                              <p className="font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" /> Feedback
                              </p>
                              <p className="text-muted-foreground">
                                {ride.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Timeline */}
                      <div>
                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" /> Timeline
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          {Object.entries(ride.timestampsLog).map(
                            ([key, value]) => (
                              <div key={key}>
                                <p className="text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </p>
                                <p className="font-medium">
                                  {formatDate(value as string)}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {meta.totalPage > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPage}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1))
                }
                disabled={currentPage === meta.totalPage}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RideDetailsAdmin;