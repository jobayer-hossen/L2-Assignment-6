import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import { useRideRequestMutation } from "@/redux/features/ride/riders.api";
import { scrollToTop } from "@/hooks/scroll";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createRideZodSchema = z.object({
  riderId: z.string().min(1, { message: "Rider id required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type required" }),
  pickupLocation: z.object({
    lati: z.number(),
    long: z.number(),
    address: z.string().min(1, { message: "Pickup address required" }),
  }),
  destination: z.object({
    lati: z.number(),
    long: z.number(),
    address: z.string().min(1, { message: "Destination required" }),
  }),
});

async function getAddressFromCoords(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return `Lat: ${lat}, Lng: ${lng}`;
  }
}

function LocationPicker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function RideRequestForm() {
  scrollToTop();
  const navigate = useNavigate();
  const { data } = useUserInfoQuery(undefined);
  const [rideRequest, { isLoading }] = useRideRequestMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createRideZodSchema>>({
    resolver: zodResolver(createRideZodSchema),
    defaultValues: {
      riderId: data?.data?._id,
    },
  });

  const pickup = watch("pickupLocation");
  const destination = watch("destination");

  useEffect(() => {
    if (data?.data?._id) {
      setValue("riderId", data.data._id, { shouldValidate: true });
    }
  }, [data, setValue]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const onSubmit = async (payload: z.infer<typeof createRideZodSchema>) => {
    const rideRequestInfo = {
      riderId: payload.riderId,
      vehicleType: payload.vehicleType,
      pickupLocation: {
        lati: payload.pickupLocation.lati,
        long: payload.pickupLocation.long,
        address: payload.pickupLocation.address,
      },
      destination: {
        lati: payload.destination.lati,
        long: payload.destination.long,
        address: payload.destination.address,
      },
    };

    try {
      await rideRequest(rideRequestInfo).unwrap();
      toast.success("Ride request submitted successfully!");
      reset();
      navigate(`/rider/history`);
    } catch (err) {
      console.error("❌ API Error:", err);
      toast.error("Failed to submit ride request.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 transition-colors duration-300">
      <div className="w-full max-w-5xl backdrop-blur-sm bg-primary/20 shadow-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            Book Your Ride 🚖
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Click on the maps below to set your pickup and drop-off locations.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Rider ID (hidden) */}
          <input type="hidden" {...register("riderId")} />

          {/* Vehicle Type Selector */}
          <div className="space-y-2">
            <label
              htmlFor="vehicleType"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Choose Vehicle Type
            </label>
            <div className="relative">
              <select
                id="vehicleType"
                {...register("vehicleType")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                <option value="CAR">Car 🚗</option>
                <option value="BIKE">Bike 🏍️</option>
                <option value="BICYCLE">Bicycle 🚲</option>
              </select>
            </div>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm font-medium">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          {/* Maps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pickup Location */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                📍 Pickup Location (Click on Map)
              </label>
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <MapContainer
                  center={[23.8103, 90.4125]}
                  zoom={13}
                  style={{ height: "380px", width: "100%" }}
                  className="rounded-t-2xl"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker
                    onSelect={async (lat, lng) => {
                      setValue("pickupLocation.lati", lat);
                      setValue("pickupLocation.long", lng);
                      const address = await getAddressFromCoords(lat, lng);
                      setValue("pickupLocation.address", address);
                    }}
                  />
                  {pickup?.lati && pickup?.long && (
                    <Marker position={[pickup.lati, pickup.long]} />
                  )}
                </MapContainer>
              </div>
              {pickup?.address && (
                <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-1 px-2">
                  Selected: {pickup.address}
                </p>
              )}
              {errors.pickupLocation?.address && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.pickupLocation.address.message}
                </p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                🎯 Destination (Click on Map)
              </label>
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <MapContainer
                  center={[23.8103, 90.4125]}
                  zoom={13}
                  style={{ height: "380px", width: "100%" }}
                  className="rounded-t-2xl"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker
                    onSelect={async (lat, lng) => {
                      setValue("destination.lati", lat);
                      setValue("destination.long", lng);
                      const address = await getAddressFromCoords(lat, lng);
                      setValue("destination.address", address);
                    }}
                  />
                  {destination?.lati && destination?.long && (
                    <Marker position={[destination.lati, destination.long]} />
                  )}
                </MapContainer>
              </div>
              {destination?.address && (
                <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-1 px-2">
                  Selected: {destination.address}
                </p>
              )}
              {errors.destination?.address && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.destination.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Hidden Inputs */}
          <input type="hidden" {...register("pickupLocation.lati")} />
          <input type="hidden" {...register("pickupLocation.long")} />
          <input type="hidden" {...register("pickupLocation.address")} />
          <input type="hidden" {...register("destination.lati")} />
          <input type="hidden" {...register("destination.long")} />
          <input type="hidden" {...register("destination.address")} />

          {/* Submit Button */}
          <div className="pt-4 w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[300px] cursor-pointer py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Request Ride Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
