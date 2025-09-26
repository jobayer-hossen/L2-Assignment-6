import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useDriverVehicleInfoQuery,
  useDriverVehicleUpdateMutation,
} from "@/redux/features/driver/driver.api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const VEHICLE_TYPES = {
  CAR: { label: "Car" },
  BIKE: { label: "Motorcycle" },
  BICYCLE: { label: "Bicycle" },
};

const vehicleTypeKeys = Object.keys(VEHICLE_TYPES) as [
  keyof typeof VEHICLE_TYPES
];

const vehicleUpdateSchema = z.object({
  userId: z.string().min(3, "License number must be at least 3 characters"),
  NIDNumber: z
    .string()
    .min(10, "NID must be at least 10 digits")
    .max(15, "NID must not exceed 15 digits"),
  licenseNumber: z
    .string()
    .min(3, "License number must be at least 3 characters"),
  vehicleInfo: z.object({
    type: z.enum(vehicleTypeKeys as [string, ...string[]], {
      message: "Please select a vehicle type",
    }),
    model: z.string().min(2, "Vehicle model must be at least 2 characters"),
    plateNumber: z
      .string()
      .min(3, "Plate number must be at least 3 characters"),
    color: z.string().optional(),
    seats: z.string().optional(),
  }),
});

export default function UpdateVehicle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { data: driverVehicleInfo, isLoading } =
    useDriverVehicleInfoQuery(undefined);

  const [updateVehicle] = useDriverVehicleUpdateMutation();

  const form = useForm<z.infer<typeof vehicleUpdateSchema>>({
    resolver: zodResolver(vehicleUpdateSchema),
  });

  useEffect(() => {
    if (userInfo?.data && driverVehicleInfo?.data) {
      form.reset({
        userId: userInfo?.data._id,
        NIDNumber: driverVehicleInfo.data.NIDNumber,
        licenseNumber: driverVehicleInfo.data.licenseNumber,
        vehicleInfo: {
          type: driverVehicleInfo.data.vehicleInfo.vehicleType,
          model: driverVehicleInfo.data.vehicleInfo.vehicleModel,
          plateNumber: driverVehicleInfo.data.vehicleInfo.vehicleNumberPlate,
          color: driverVehicleInfo.data.vehicleInfo.vehicleColor,
          seats: driverVehicleInfo.data.vehicleInfo.seats,
        },
      });
    }
  }, [userInfo, form, driverVehicleInfo]);

  const onSubmit = async (formData: z.infer<typeof vehicleUpdateSchema>) => {
    const updateUserInfo = {
      userId: userInfo?.data._id,
      NIDNumber: Number(formData.NIDNumber),
      licenseNumber: Number(formData.licenseNumber),
      vehicleInfo: {
        vehicleType: formData.vehicleInfo.type,
        vehicleModel: formData.vehicleInfo.model,
        vehicleNumberPlate: formData.vehicleInfo.plateNumber,
        vehicleColor: formData.vehicleInfo.color || undefined,
        seats: formData.vehicleInfo.seats
          ? Number(formData.vehicleInfo.seats)
          : undefined,
      },
    };

    try {
      await updateVehicle(updateUserInfo).unwrap();
      toast.success("User Update successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col gap-6 md:w-1/3 mx-auto", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Update Driver Vehicle</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to update your Profile
        </p>
      </div>

      <div className="grid gap-6 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="NIDNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* License Number */}
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver's License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vehicle Type */}
            <FormField
              control={form.control}
              name="vehicleInfo.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(VEHICLE_TYPES).map(
                        ([value, { label }]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vehicle Model */}
            <FormField
              control={form.control}
              name="vehicleInfo.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Honda CBR, Toyota Camry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Plate Number */}
            <FormField
              control={form.control}
              name="vehicleInfo.plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., BIKE001, CAR1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vehicle Color */}
            <FormField
              control={form.control}
              name="vehicleInfo.color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Color (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black, Red" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seats */}
            <FormField
              control={form.control}
              name="vehicleInfo.seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Seats (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              {isLoading ? <Loader2 /> : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
