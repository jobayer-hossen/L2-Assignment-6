import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAvailableRideQuery } from "@/redux/features/ride/riders.api";
import type { Ride } from "@/types/ride.type";
import { DollarSign, User } from "lucide-react";
import { Link } from "react-router";

export default function AvailableRide() {
  const { data: availableRides, isLoading } =
    useGetAvailableRideQuery(undefined);

  if (isLoading && !availableRides) <Skeleton />;

  return (
    <>
      {/* Available Rides Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Available Rides
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Pick up available ride requests in your area
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRides?.data?.map((ride: Ride) => (
              <Link
                key={ride._id}
                to={`/ride-details/${ride._id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {ride.status}
                      </Badge>
                      <div className="flex items-center text-primary font-semibold">
                        <DollarSign className="w-4 h-4 mr-1" />${ride.fare}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{ride.riderId.name}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-sm font-medium">Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.pickup.address}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-sm font-medium">Destination</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.destination.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-muted-foreground">
                      Requested{" "}
                      {new Date(ride.requestedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
