import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2, MapPin, Clock, Info, MessageSquare } from "lucide-react";
import { Link, useParams } from "react-router";
import { scrollToTop } from "@/hooks/scroll";
import { useGetRideByIdForRiderQuery } from "@/redux/features/ride/riders.api";

const RideDetailsRider = () => {
  scrollToTop();
  const { rideId } = useParams();
  const { data: rideData, isLoading, isError } = useGetRideByIdForRiderQuery(rideId!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !rideData?.data) {
    return <div className="text-center text-red-500">Ride not found</div>;
  }

  const ride = rideData.data;

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

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/rider/history" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to History
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ride Details</h1>
              <p className="text-muted-foreground">Ride ID: {ride._id}</p>
            </div>
          </div>

          {/* Trip Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Trip Information
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
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{ride.pickupLocation.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Picked up at {formatDate(ride.timestampsLog.pickedUpAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{ride.destination.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Dropped off at {formatDate(ride.timestampsLog.completedAt)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ride Created</p>
                    <p className="font-medium">{formatDate(ride.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ride Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Ride Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {Object.entries(ride.timestampsLog).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>{formatDate(value as string | undefined)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Cancellation Info */}
          {ride.rideStatus === "CANCELLED" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-red-500" /> Cancellation Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Reason:</span> {ride.cancelReason || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Cancelled By:</span> {ride.cancelledBy || "N/A"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Feedback */}
          {ride.feedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{ride.feedback}</CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RideDetailsRider;
