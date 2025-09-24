import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDriverInfoQuery } from "@/redux/features/driver/driver.api";

export default function VehicleStatus() {
  const { data: driverInfo, isLoading } = useDriverInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">Loading vehicle status...</p>
      </div>
    );
  }

  if (!driverInfo?.data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground text-lg font-medium">
          No vehicle registered yet.
        </p>
      </div>
    );
  }

  const driver = driverInfo.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
           My Vehicle Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Driver Info */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">National ID</p>
              <p className="font-medium">{driver.NIDNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">{driver.licenseNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Driver Status</p>
              <p
                className={`font-semibold ${
                  driver.driverStatus === "APPROVED"
                    ? "text-green-600"
                    : "text-destructive"
                }`}
              >
                {driver.driverStatus}
              </p>
            </div>
          </div>

          {/* Vehicle Info */}
          <h3 className="text-lg font-semibold mb-3">Vehicle Information</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Field</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Type</TableCell>
                  <TableCell>{driver.vehicleInfo.vehicleType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Model</TableCell>
                  <TableCell>{driver.vehicleInfo.vehicleModel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Plate Number</TableCell>
                  <TableCell>{driver.vehicleInfo.vehicleNumberPlate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Color</TableCell>
                  <TableCell>{driver.vehicleInfo.vehicleColor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Seats</TableCell>
                  <TableCell>{driver.vehicleInfo.seats}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Dates */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Created: </span>
              {new Date(driver.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium text-foreground">Updated: </span>
              {new Date(driver.updatedAt).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
