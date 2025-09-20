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
import { useVehicleRegisterMutation } from "@/redux/features/driver/driver.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bike, Car, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const VEHICLE_TYPES = {
  Car: { label: "Car", icon: Car },
  Motorcycle: { label: "Motorcycle", icon: Bike },
  Truck: { label: "Truck", icon: Truck },
  Van: { label: "Van", icon: Car },
};

const vehicleTypeKeys = Object.keys(VEHICLE_TYPES) as [
  keyof typeof VEHICLE_TYPES
];

const vehicleRegistrationSchema = z.object({
  licenseNumber: z
    .string()
    .min(3, "License number must be at least 3 characters"),
  vehicleInfo: z.object({
    type: z.enum(vehicleTypeKeys, {
      message: "Please select a vehicle type",
    }),
    model: z.string().min(2, "Vehicle model must be at least 2 characters"),
    plateNumber: z
      .string()
      .min(3, "Plate number must be at least 3 characters"),
  }),
});

type VehicleRegistrationForm = z.infer<typeof vehicleRegistrationSchema>;

const VehicleRegistration = () => {
  const [vehicleRegister] = useVehicleRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<VehicleRegistrationForm>({
    resolver: zodResolver(vehicleRegistrationSchema),
    defaultValues: {
      licenseNumber: "",
      vehicleInfo: {
        type: undefined,
        model: "",
        plateNumber: "",
      },
    },
  });

  const onSubmit = async (data: VehicleRegistrationForm) => {
    try {
      await vehicleRegister(data).unwrap();
      toast.success(
        "Vehicle Registered Successfully! Your vehicle has been registered and is pending approval."
      );
      navigate("/drivers/status");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Some thing went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Register Your Vehicle
            </h1>
            <p className="text-muted-foreground">
              Add your vehicle details to start accepting ride requests
            </p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Vehicle Information
              </CardTitle>
              <CardDescription className="text-center">
                Please provide accurate information about your vehicle
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* License Number */}
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver's License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., DL001234"
                            {...field}
                            className="bg-background border-input"
                          />
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
                            <SelectTrigger className="bg-background w-full border-input">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* Loop through the keys of the single source of truth */}
                            {Object.entries(VEHICLE_TYPES).map(
                              ([value, { label, icon: IconComponent }]) => (
                                <SelectItem key={value} value={value}>
                                  <div className="flex items-center gap-2 ">
                                    <IconComponent className="h-4 w-4" />
                                    {label}
                                  </div>
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
                            className="bg-background border-input"
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
                            className="bg-background border-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground font-medium py-3"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Registering..."
                      : "Register Vehicle"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> Your
                    vehicle registration will be reviewed by our team. You'll
                    receive a notification once your vehicle is approved and you
                    can start accepting rides.{" "}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VehicleRegistration;
