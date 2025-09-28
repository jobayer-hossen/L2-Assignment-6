import { baseApi } from "@/redux/baseApi";

export const ridersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rideRequest: builder.mutation({
      query: (rideRequestInfo) => ({
        url: "rides/request-ride",
        method: "POST",
        data: rideRequestInfo,
      }),
      invalidatesTags: ["RIDER"],
    }),


    getRideHistory: builder.query({
      query: () => ({
        url: "/rides/all-ride-riders",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    rideFeedback: builder.mutation({
      query: ({ rideId, feedback }) => ({
        url: `/rides/feedback/${rideId}`,
        method: "POST",
        data: { feedback },
      }),
      invalidatesTags: ["RIDE"],
    }),

    getRideByIdForRider: builder.query({
      query: (id: string) => ({
        url: `/rides/my-ride/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    getAvailableRide: builder.query({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    getRideById: builder.query({
      query: (id: string) => ({
        url: `/rides/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const {
  useRideRequestMutation,
  useGetRideHistoryQuery,
  useGetRideByIdForRiderQuery,
  useGetAvailableRideQuery,
  useGetRideByIdQuery,
  useRideFeedbackMutation,
} = ridersApi;
