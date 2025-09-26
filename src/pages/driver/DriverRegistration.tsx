import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { scrollToTop } from "@/hooks/scroll";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useDriverRegisterMutation } from "@/redux/features/driver/driver.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const VEHICLE_TYPES = {
  CAR: { label: "Car" },
  BIKE: { label: "Motorcycle" },
  BICYCLE: { label: "Bicycle" },
};

const vehicleTypeKeys = Object.keys(VEHICLE_TYPES) as [
  keyof typeof VEHICLE_TYPES
];

const vehicleRegistrationSchema = z.object({
  NIDNumber: z
    .string()
    .min(10, "NID must be at least 10 digits")
    .max(15, "NID must not exceed 15 digits"),
  licenseNumber: z
    .string()
    .min(3, "License number must be at least 3 characters"),
  vehicleInfo: z.object({
    type: z.enum(vehicleTypeKeys, { message: "Please select a vehicle type" }),
    model: z.string().min(2, "Vehicle model must be at least 2 characters"),
    plateNumber: z
      .string()
      .min(3, "Plate number must be at least 3 characters"),
    color: z.string().optional(),
    seats: z.string().optional(),
  }),
});

type VehicleRegistrationForm = z.infer<typeof vehicleRegistrationSchema>;

const DriverRegistration = () => {
  scrollToTop();

  const { data, isLoading } = useUserInfoQuery(undefined);
  const [driverRegister] = useDriverRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<VehicleRegistrationForm>({
    resolver: zodResolver(vehicleRegistrationSchema),
    defaultValues: {
      NIDNumber: "",
      licenseNumber: "",
      vehicleInfo: {
        type: undefined,
        model: "",
        plateNumber: "",
        color: "",
        seats: "",
      },
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (data?.data?.role === "DRIVER") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <Card className="max-w-lg mx-auto border-accent/20 bg-accent/5 shadow-md">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              You have already applied!
            </h2>
            <p className="text-muted-foreground">
              Your driver application has been submitted. Please wait for admin
              approval. Once approved, you can start accepting ride requests.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSubmit = async (formData: VehicleRegistrationForm) => {
    try {
      const driverInfo = {
        userId: data?.data._id,
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

      await driverRegister(driverInfo).unwrap();
      toast.success("Vehicle Registered Successfully! Pending admin approval.");
      navigate("/driver/vehicle-status");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-3 border-primary">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Vehicle Information
              </CardTitle>
              <CardDescription className="text-center">
                Please provide accurate information for verification
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* NID Number */}
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
                          <Input
                            placeholder="e.g., BIKE001, CAR1234"
                            {...field}
                          />
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
                          <Input
                            type="number"
                            placeholder="e.g., 4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-center">
                    <Button
                      type="submit"
                      className="bg-primary hover:shadow-primary text-lg px-8 py-3 cursor-pointer rounded"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Registering..."
                        : "Apply for Driver"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> Your
                  vehicle registration will be reviewed by our team. You'll be
                  notified once approved.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DriverRegistration;
