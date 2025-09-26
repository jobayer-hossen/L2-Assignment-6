import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useRef, useState } from "react";
import isApiErrorResponse from "@/utils/errorGurd";

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

export default function VerifyOtpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const name = location.state?.name;
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp] = useSendOtpMutation();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    const combinedOtp = newOtp.join("");
    form.setValue("otp", combinedOtp);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData
      .slice(0, 6)
      .split("")
      .map((char) => char);
    const newOtp = [
      ...pastedArray,
      ...new Array(6 - pastedArray.length).fill(""),
    ];

    setOtp(newOtp);
    form.setValue("otp", newOtp.join(""));

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    try {
      await verifyOtp({ email, otp: data.otp }).unwrap();
      toast.success("Your account has been verified!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const reSendOTP = async () => {
    try {
      await sendOtp({ email: email, name: name }).unwrap();
      toast.success("New OTP send successfully");
      navigate("/verify", { state: { email: email, name: name } });
    } catch (error) {
      if (isApiErrorResponse(error)) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="flex items-center gap-2 mt-8">
        <img
          src="https://cdn-icons-png.freepik.com/512/10028/10028767.png"
          alt="logo"
          className="w-[40px]"
        />
        <span className="font-bold text-2xl text-primary">LoopRide</span>
      </div>

      <div className="w-full max-w-md mt-16 border-3 border-primary rounded-2xl">
        <div className="p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Your Account
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-center gap-2 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold focus:border-primary focus:outline-none"
                  />
                ))}
              </div>

              <FormMessage className="text-center mb-4" />

              <Button
                type="submit"
                className="w-full py-3 text-lg font-semibold cursor-pointer"
                disabled={isLoading || otp.join("").length !== 6}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  "Verify Account"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-6 text-sm text-gray-400">
            Didn't receive code?{" "}
            <button
              onClick={reSendOTP}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
