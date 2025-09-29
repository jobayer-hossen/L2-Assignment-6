import { scrollToTop } from "@/hooks/scroll";
import {
  useAcceptRideMutation,
  useAllRideForDriverQuery,
  useRideCancelMutation,
} from "@/redux/features/driver/driver.api";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PickARide() {
  scrollToTop();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useAllRideForDriverQuery(undefined);
  const [rideCancel] = useRideCancelMutation();
  const [acceptRide] = useAcceptRideMutation();
  const [cancelReasonText, setCancelReasonText] = useState<string>("");
  const [showCancelInput, setShowCancelInput] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data?.data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="text-gray-500">No rides available at the moment.</span>
      </div>
    );
  }

  const handleCancel = async (rideId: string) => {
    if (!cancelReasonText.trim()) {
      toast.error("Please enter a cancel reason");
      return;
    }

    try {
      await rideCancel({ rideId, cancelReason: cancelReasonText }).unwrap();
      toast.success("Ride cancelled successfully");
      setShowCancelInput(null);
      setCancelReasonText("");
    } catch (error) {
      console.error("Failed to cancel ride:", error);
      toast.error("Something went wrong");
    }
  };

  const handleAccept = async (rideId: string) => {
    try {
      await acceptRide(rideId).unwrap();
      toast.success("Ride accepted successfully");
      navigate(`/driver/ride-details/${rideId}`); 
    } catch (error) {
      console.error("Failed to accept ride:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-900 dark:text-white">
        Pick a Ride
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.data.map((ride: any) => (
          <motion.div
            key={ride._id}
            // whileHover={{ scale: 1.03 }}
            className="bg-primary/15 shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform duration-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pickup:
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {ride.pickupLocation.address}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-3">
                Destination:
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {ride.destination.address}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Rider: {ride.riderId.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Requested At:{" "}
                {new Date(ride.timestampsLog.requestedAt).toLocaleString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Status: {ride.rideStatus}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              {showCancelInput === ride._id ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter cancel reason..."
                    value={cancelReasonText}
                    onChange={(e) => setCancelReasonText(e.target.value)}
                    className="w-full py-2 px-3 border rounded-md"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleCancel(ride._id)}
                      className="flex-1 py-2 px-4 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 transition"
                    >
                      Confirm Cancel
                    </button>
                    <button
                      onClick={() => setShowCancelInput(null)}
                      className="flex-1 py-2 px-4 bg-gray-400 text-white cursor-pointer rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowCancelInput(ride._id)}
                    className="flex-1 py-2 px-4 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAccept(ride._id)}
                    className="flex-1 py-2 px-4 bg-green-600 text-white cursor-pointer rounded hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
