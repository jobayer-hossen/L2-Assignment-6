import type { ApiErrorResponse } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isApiErrorResponse(err: any): err is ApiErrorResponse {
  return (
    err &&
    typeof err === "object" &&
    "data" in err &&
    typeof err.data === "object" &&
    "message" in err.data
  );
}
