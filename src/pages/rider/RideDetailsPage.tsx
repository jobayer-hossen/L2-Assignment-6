import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  useGetRideByIdForDriverQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driver.api";
import isApiErrorResponse from "@/utils/errorGurd";
import { ArrowLeft, Clock, Loader2, MapPin } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { scrollToTop } from "@/hooks/scroll";

const statusSchema = z.object({
  rideStatus: z.enum(["ACCEPTED", "IN_TRANSIT", "PICKED_UP", "COMPLETED"]),
});

type StatusFormData = z.infer<typeof statusSchema>;

const RideDetails = () => {
  scrollToTop();
   const navigate = useNavigate();
  const { rideId } = useParams();
  const {
    data: rideData,
    isLoading,
    isError,
    refetch,
  } = useGetRideByIdForDriverQuery(rideId!);
  const [updateRideStatus] = useUpdateRideStatusMutation();

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

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const onStatusSubmit = async (data: StatusFormData) => {
    try {
      const res = await updateRideStatus({
        rideStatus: data.rideStatus,
        id: rideData?.data?._id,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        refetch();
        if (res.data.rideStatus === "COMPLETED") {
          navigate(`/driver/ride-status`); 
        }
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      if (isApiErrorResponse(error)) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
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
  }

  const pickup = rideData?.data.pickupLocation;
  const dest = rideData?.data.destination;

  const distance =
    pickup && dest
      ? getDistanceFromLatLonInKm(
          pickup.lati,
          pickup.long,
          dest.lati,
          dest.long
        ).toFixed(2) + " km"
      : "N/A";

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" asChild>
              <Link to="/driver/ride-status">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to History
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Ride Details
              </h1>
              <p className="text-muted-foreground">
                Ride ID: {rideData?.data?._id}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Trip Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Trip Information
                      </span>
                      <Badge
                        variant={
                          rideData?.data.rideStatus === "COMPLETED"
                            ? "secondary"
                            : rideData?.data.rideStatus === "CANCELLED"
                            ? "destructive"
                            : "default"
                        }
                        className="px-3 py-1 text-xs font-medium"
                      >
                        {rideData?.data.rideStatus}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          Pickup Location
                        </p>
                        <p className="font-medium">
                          {rideData?.data.pickupLocation.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Picked up at{" "}
                          {formatDate(rideData?.data.timestampsLog.acceptedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          Destination
                        </p>
                        <p className="font-medium">
                          {rideData?.data.destination.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Dropped off at {rideData?.data.dropoffTime}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Distance
                        </p>
                        <p className="font-medium">{distance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Ride created date
                        </p>
                        <p className="font-medium">
                          {formatDate(rideData?.data.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <div className="space-y-6">
              {/*Ride Status Update Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="shadow-lg border border-border/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Clock className="w-5 h-5 text-primary" />
                      Ride Status Timeline
                    </CardTitle>
                    <CardDescription>
                      Manage and track the current status of this ride
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* 🔹 Timeline */}
                    <RideStatusTimeline
                      currentStatus={rideData?.data.rideStatus}
                    />

                    {/* 🔹 Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white flex-1 cursor-pointer"
                        disabled={rideData?.data.rideStatus !== "ACCEPTED"}
                        onClick={() =>
                          onStatusSubmit({
                            rideStatus: "PICKED_UP",
                          } as StatusFormData)
                        }
                      >
                        Picked Up
                      </Button>

                      <Button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1 cursor-pointer"
                        disabled={rideData?.data.rideStatus !== "PICKED_UP"}
                        onClick={() =>
                          onStatusSubmit({
                            rideStatus: "IN_TRANSIT",
                          } as StatusFormData)
                        }
                      >
                        IN TRANSIT
                      </Button>

                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 cursor-pointer"
                        disabled={rideData?.data.rideStatus !== "IN_TRANSIT"}
                        onClick={() =>
                          onStatusSubmit({
                            rideStatus: "COMPLETED",
                          } as StatusFormData)
                        }
                      >
                        Completed
                      </Button>
                    </div>

                    {/* 🔹 Status Logs */}
                    <div className="rounded-lg bg-muted/40 p-4 space-y-2 text-sm">
                      {rideData?.data.timestampsLog?.acceptedAt && (
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-green-600">✅</span>
                          <span className="font-medium">Accepted:</span>
                          {formatDate(rideData?.data.timestampsLog.acceptedAt)}
                        </p>
                      )}
                      {rideData?.data.timestampsLog?.pickedUpAt && (
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-purple-600">🚗</span>
                          <span className="font-medium">Picked Up:</span>
                          {formatDate(rideData?.data.timestampsLog.pickedUpAt)}
                        </p>
                      )}
                      {rideData?.data.timestampsLog?.completedAt && (
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-green-700">🏁</span>
                          <span className="font-medium">Completed:</span>
                          {formatDate(rideData?.data.timestampsLog.completedAt)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideDetails;

const RideStatusTimeline = ({ currentStatus }: { currentStatus: string }) => {
  const statuses = [
    "REQUESTED",
    "ACCEPTED",
    "PICKED_UP",
    "IN_TRANSIT",
    "COMPLETED",
  ];

  return (
    <div className="flex items-center justify-between mt-4 relative">
      {statuses.map((status, idx) => {
        const isActive = statuses.indexOf(currentStatus) >= idx;

        return (
          <div
            key={status}
            className="flex flex-col items-center flex-1 relative"
          >
            {/* Animated Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {idx + 1}
            </motion.div>

            {/* Animated Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`mt-2 text-xs font-medium text-center ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {status.replace("_", " ")}
            </motion.p>

            {/* Animated Connector Line */}
            {idx < statuses.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`h-1 -mt-5 ${
                  isActive ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
