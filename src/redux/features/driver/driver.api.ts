import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverRegister: builder.mutation({
      query: (driverInfo) => ({
        url: "/drivers/apply-for-driver",
        method: "POST",
        data: driverInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),


    driverInfo: builder.query({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    myRideInfo: builder.query({
      query: () => ({
        url: "/drivers/completed-ride",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    allRideForDriver: builder.query({
      query: () => ({
        url: "/rides/available-ride-driver",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    rideCancel: builder.mutation({
      query: ({ rideId, cancelReason }) => ({
        url: `/rides/cancel/${rideId}`,
        method: "PATCH",
        data: { cancelReason },
      }),
      invalidatesTags: ["RIDE"],
    }),

    acceptRide: builder.mutation({
      query: (rideId: string) => ({
        url: `/rides/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    getRideByIdForDriver: builder.query({
      query: (id: string) => ({
        url: `/rides/driver/rides/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    driverVehicleInfo: builder.query({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

      driverVehicleUpdate: builder.mutation({
      query: (updateData) => ({
        url: "/drivers/update-my-driver-profile",
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    updateRideStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rides/status/${id}`,
        method: "PATCH",
        data: { rideStatus: status },
      }),
      invalidatesTags: ["RIDE"],
    }),
  }),
});

export const {
  useDriverRegisterMutation,
  useMyRideInfoQuery,
  useDriverInfoQuery,
  useGetRideByIdForDriverQuery,
  useAllRideForDriverQuery,
  useRideCancelMutation,
  useAcceptRideMutation,
  useUpdateRideStatusMutation,
  useDriverVehicleInfoQuery,
  useDriverVehicleUpdateMutation
} = driverApi;
