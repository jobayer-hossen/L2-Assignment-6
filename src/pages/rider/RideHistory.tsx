/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedBackModal from "@/components/FeedBackModal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRideHistoryQuery } from "@/redux/features/ride/riders.api";

export default function RideHistory() {
  const { data, isLoading } = useGetRideHistoryQuery(undefined);

  return (
    <>
      {!isLoading && data ? (
        <div className="space-y-4 border p-4 rounded-xl">
          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cancel Ride</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((ride: any, index: number) => (
                <TableRow key={ride._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(ride?.requestedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ride?.pickup?.address}</TableCell>
                  <TableCell>{ride?.destination?.address}</TableCell>
                  <TableCell
                    className={`${
                      ride?.status === "cancelled" ? "text-destructive" : ""
                    }`}
                  >
                    {ride?.status}
                  </TableCell>

                  <TableCell
                    className={`${
                      ride?.status === "cancelled" ? "hidden" : ""
                    }`}
                  >
                    <FeedBackModal id={ride?._id}>Cancel</FeedBackModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
