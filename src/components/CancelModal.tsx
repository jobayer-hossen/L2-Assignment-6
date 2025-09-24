import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRideCancelMutation } from "@/redux/features/driver/driver.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import type { ReactNode } from "react";


const feedbackSchema = z.object({
  reason: z
    .string()
    .min(2, { message: "Reason is too short" })
    .max(100, { message: "Reason is too long" }),
});

type FeedbackModalProps = {
  children: ReactNode;
  rideId: string;
};

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function CancelModal({ children, rideId }: FeedbackModalProps) {
  const [rideCancel] = useRideCancelMutation();

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { reason: "" },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    if (!data.reason.trim()) {
      toast.error("Please enter a cancel reason");
      return;
    }

    try {
      await rideCancel({ rideId, cancelReason: data.reason }).unwrap();
      toast.success("Ride cancelled successfully");
      form.reset();
    } catch (error) {
      console.error("Failed to cancel ride:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why do you want to cancel this ride?</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancel Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the reason for cancelling the ride"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Send Reason</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
