import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

// Zod Schema (frontend validation aligned with backend)
const createRideZodSchema = z.object({
  riderId: z.string().min(1, { message: "Rider id required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type required" }),
  pickupLocation: z.object({
    lati: z.number().min(-90).max(90),
    long: z.number().min(-180).max(180),
    address: z.string().min(1, { message: "Pickup address required" }),
  }),
  destination: z.object({
    lati: z.number().min(-90).max(90),
    long: z.number().min(-180).max(180),
    address: z.string().min(1, { message: "Destination required" }),
  }),
});

export default function RideRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createRideZodSchema>>({
    resolver: zodResolver(createRideZodSchema),
  });

  const onSubmit = async (data: z.infer<typeof createRideZodSchema>) => {
    try {
      const res = await axios.post("/api/rides/request", data);
      toast.success("Ride request submitted successfully!");
      reset();
      console.log("Ride created:", res.data);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Ride request failed!");
      } else {
        toast.error("Ride request failed!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Request a Ride 🚖
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rider ID */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">
              Rider ID
            </label>
            <input
              type="text"
              {...register("riderId")}
              className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Enter your Rider ID"
            />
            {errors.riderId && (
              <p className="text-red-500 text-sm">{errors.riderId.message}</p>
            )}
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">
              Vehicle Type
            </label>
            <select
              {...register("vehicleType")}
              className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select vehicle type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="AUTO">Auto</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          {/* Pickup Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Pickup Lat
              </label>
              <input
                type="number"
                step="any"
                {...register("pickupLocation.lati", { valueAsNumber: true })}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
              {errors.pickupLocation?.lati && (
                <p className="text-red-500 text-sm">
                  {errors.pickupLocation.lati.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Pickup Long
              </label>
              <input
                type="number"
                step="any"
                {...register("pickupLocation.long", { valueAsNumber: true })}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
              {errors.pickupLocation?.long && (
                <p className="text-red-500 text-sm">
                  {errors.pickupLocation.long.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Pickup Address
              </label>
              <input
                type="text"
                {...register("pickupLocation.address")}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                placeholder="Enter pickup address"
              />
              {errors.pickupLocation?.address && (
                <p className="text-red-500 text-sm">
                  {errors.pickupLocation.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Destination Lat
              </label>
              <input
                type="number"
                step="any"
                {...register("destination.lati", { valueAsNumber: true })}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
              {errors.destination?.lati && (
                <p className="text-red-500 text-sm">
                  {errors.destination.lati.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Destination Long
              </label>
              <input
                type="number"
                step="any"
                {...register("destination.long", { valueAsNumber: true })}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
              {errors.destination?.long && (
                <p className="text-red-500 text-sm">
                  {errors.destination.long.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <label className="block font-medium text-gray-700 dark:text-gray-200">
                Destination Address
              </label>
              <input
                type="text"
                {...register("destination.address")}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                placeholder="Enter destination address"
              />
              {errors.destination?.address && (
                <p className="text-red-500 text-sm">
                  {errors.destination.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Request Ride"}
          </button>
        </form>
      </div>
    </div>
  );
}
