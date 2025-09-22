import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img
              src="https://cdn-icons-png.freepik.com/512/10028/10028767.png?ga=GA1.1.1697682617.1758554927"
              alt="logo"
              className="w-[40px]"
            />
            <span className="font-bold text-2xl text-primary dark:text-primary-light">
              LoopRide
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
