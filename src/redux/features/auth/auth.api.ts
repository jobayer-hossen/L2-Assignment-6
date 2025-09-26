import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    sendOtp: builder.mutation({
      query: (data: { email: string; name: string }) => ({
        url: "/otp/send",
        method: "POST",
        data: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/otp/verify",
        method: "POST",
        data: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useUpdateProfileMutation,
} = authApi;
