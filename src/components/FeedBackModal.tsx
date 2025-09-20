import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRideCancelStatusMutation } from "@/redux/features/ride/riders.api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
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

const feedbackSchema = z.object({
  reason: z
    .string()
    .min(2, {
      error: "Feed back is too short",
    })
    .max(50),
});

type FeedbackModalProps = {
  children: ReactNode;
  id: string;
};

export default function FeedBackModal({ children, id }: FeedbackModalProps) {
  const [cancelRide] = useRideCancelStatusMutation();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    const feedback = {
      reason: data.reason,
      id: id,
    };

    try {
      await cancelRide(feedback).unwrap();
      toast.success("Ride cancel successfully");
    } catch (error) {
      console.log(error);
      toast.warning("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why you want to cancel the ride?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you want to cancel the ride"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button type="submit">Send Reason</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
