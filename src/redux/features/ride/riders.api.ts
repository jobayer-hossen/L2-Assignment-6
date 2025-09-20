import { baseApi } from "@/redux/baseApi";

export const ridersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rideRequest: builder.mutation({
      query: (rideRequestInfo) => ({
        url: "rides/request",
        method: "POST",
        data: rideRequestInfo,
      }),
      invalidatesTags: ["RIDER"],
    }),

    getCurrentRide: builder.query({
      query: (id) => ({
        url: `/${id}/history`,
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    getRideHistory: builder.query({
      query: () => ({
        url: "/rides/history",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    getAvailableRide: builder.query({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),

    rideCancelStatus: builder.mutation({
      query: ({ reason, id }) => ({
        url: `rides/${id}/cancel`,
        method: "PATCH",
        data: { reason },
      }),
      invalidatesTags: ["RIDER"],
    }),

    rideAcceptStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `rides/${id}/accept`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDER"],
    }),

    ridePickupStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `rides/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDER"],
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
  useRideCancelStatusMutation,
  useGetRideHistoryQuery,
  useGetCurrentRideQuery,
  useGetAvailableRideQuery,
  useGetRideByIdQuery,
  useRideAcceptStatusMutation,
  useRidePickupStatusMutation,
} = ridersApi;
