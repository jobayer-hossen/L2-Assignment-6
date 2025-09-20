import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useGetRideByIdQuery,
  useRideAcceptStatusMutation,
  useRidePickupStatusMutation,
} from "@/redux/features/ride/riders.api";
import isApiErrorResponse from "@/utils/errorGurd";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Receipt,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

// Status update schema
const statusSchema = z.object({
  status: z.enum(["accept", "picked_up", "completed"]),
});

type StatusFormData = z.infer<typeof statusSchema>;

const RideDetails = () => {
  const { rideId } = useParams();
  const { data: rideData, isLoading, isError } = useGetRideByIdQuery(rideId!);
  const [acceptRide] = useRideAcceptStatusMutation();
  const [pickedUpRide] = useRidePickupStatusMutation();

  // Status form
  const statusForm = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  });

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

  const onStatusSubmit = async (data: StatusFormData) => {
    try {
      const res = await pickedUpRide({
        status: data.status,
        id: rideData?.data?._id,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      if (isApiErrorResponse(error)) {
        // TypeScript now knows that `error` has `data` and `message`
        toast.error(error.data.message);
      } else {
        // Handle other types of errors, like network errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleAccept = async () => {
    try {
      const result = await acceptRide({
        status: "accepted",
        id: rideData?.data?._id,
      }).unwrap();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
    } catch (error) {
      if (isApiErrorResponse(error)) {
        // TypeScript now knows that `error` has `data` and `message`
        toast.error(error.data.message);
      } else {
        // Handle other types of errors, like network errors
        toast.error("An unexpected error occurred");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "ongoing":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Trip Information
                    </span>
                    <Badge
                      className={`${getStatusColor(
                        rideData?.data.status
                      )} text-white`}
                    >
                      {rideData?.data.status.charAt(0).toUpperCase() +
                        rideData?.data.status.slice(1)}
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
                        {rideData?.data.pickup.address}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Picked up at {rideData?.data.pickupTime}
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
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium">{rideData?.data.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{rideData?.data.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ride Type</p>
                      <p className="font-medium capitalize">
                        {rideData?.data.rideType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{rideData?.data.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Information */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Driver Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={rideDetails.driverName}
                      />
                      <AvatarFallback>
                        {rideDetails.driverName.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {rideDetails.driverName}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {rideDetails.driverRating} rating
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rideDetails.vehicle}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Driver
                  </Button>
                </CardContent>
              </Card> */}
            </div>

            {/* Payment & Timeline */}
            <div className="space-y-6">
              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">
                      ৳{rideData?.data.fare}
                    </div>
                    <p className="text-muted-foreground">Total Amount</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base fare</span>
                      <span>৳50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Distance charge
                      </span>
                      <span>৳{rideData?.data.fare - 50}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Service charge
                      </span>
                      <span>৳0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-600">-৳0</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Payment Method
                      </span>
                    </div>
                    <span className="font-medium">
                      {rideData?.data.paymentMethod}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/*Ride Status Update Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Status Update
                  </CardTitle>
                  <CardDescription>
                    Update your current ride status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...statusForm}>
                    <form
                      onSubmit={statusForm.handleSubmit(onStatusSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={statusForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="picked_up">
                                  Picked Up
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Update Status
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              {/* Ride Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Ride Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col  gap-3">
                      {/* Accepted */}
                      {rideData?.data?.status === "accepted" ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium">Ride Accepted</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">Ride Accepted</p>
                          </div>
                        </>
                      )}

                      {/* Picked Up */}
                      {rideData?.data?.status === "picked_up" ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium">Picked Up</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">Picked Up</p>
                          </div>
                        </>
                      )}

                      {/* completed */}
                      {rideData?.data?.status === "completed" ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium">Completed</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">Completed</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mock Map */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Route map showing pickup to destination path
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Demo Mode - Map integration available with backend)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handleAccept}
              disabled={rideData?.data?.status === "requested" ? false : true}
            >
              Accept Ride
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideDetails;
