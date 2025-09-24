import { Badge } from "@/components/ui/badge";
import { useMyRideInfoQuery } from "@/redux/features/driver/driver.api";
import { MapPin, Flag, Car, CheckCircle, XCircle } from "lucide-react";

function formatDate(date?: string) {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
}

export default function CompletedRides() {
  const { data: rideData, isLoading } = useMyRideInfoQuery(undefined);

  if (isLoading)
    return (
      <p className="text-center mt-8 text-gray-500">Loading completed rides...</p>
    );
  if (!rideData?.data || rideData.data.length === 0)
    return <p className="text-center mt-8 text-gray-500">No completed rides found.</p>;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Rides
      </h2>

      {rideData.data.map((ride: any, index: number) => (
        <div
          key={ride._id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Ride #{index + 1}
            </h3>
            <Badge
              variant={
                ride.rideStatus === "COMPLETED"
                  ? "secondary"
                  : ride.rideStatus === "CANCELLED"
                  ? "destructive"
                  : "default"
              }
            >
              {ride.rideStatus}
            </Badge>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Pickup
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {ride.pickupLocation?.address || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Flag className="text-red-500 w-5 h-5 mt-1" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Destination
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {ride.destination?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-4">
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="flex items-center gap-1">
                <span>📩</span> Requested
              </p>
              <span>{formatDate(ride.timestampsLog?.requestedAt)}</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="flex items-center gap-1">
                <Car /> Accepted
              </p>
              <span>{formatDate(ride.timestampsLog?.acceptedAt)}</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="flex items-center gap-1">
                <Car /> Picked Up
              </p>
              <span>{formatDate(ride.timestampsLog?.pickedUpAt)}</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="flex items-center gap-1">
                <CheckCircle className="text-green-500 w-4 h-4" /> Completed
              </p>
              <span>{formatDate(ride.timestampsLog?.completedAt)}</span>
            </div>
          </div>

          {/* Cancel Info */}
          {ride.cancelReason && (
            <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5 mt-1" />
              <p>
                <strong>Cancelled:</strong> {ride.cancelReason} <br />
                <strong>By:</strong> {ride.cancelledBy}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
