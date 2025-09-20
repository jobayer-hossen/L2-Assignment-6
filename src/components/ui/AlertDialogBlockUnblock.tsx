import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  status: "active" | "blocked";
};

type AlertDialogBlockUnblock = {
  user: User;
  onConfirm: () => void | Promise<void>;
};

export default function AlertDialogBlockUnblock({
  onConfirm,
  user,
}: AlertDialogBlockUnblock) {
  const handleUpdate = () => {
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant={user.status === "active" ? "destructive" : "default"}
        >
          {user.status === "active" ? "Block" : "Unblock"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user.status === "active"
              ? "Block this user?"
              : "Unblock this user?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user.status === "active"
              ? "This will prevent the user from accessing the system."
              : "This will allow the user to access the system again."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>
            {user.status === "active" ? "Confirm Block" : "Confirm Unblock"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
