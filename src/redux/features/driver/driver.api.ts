import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    vehicleRegister: builder.mutation({
      query: (driverInfo) => ({
        url: "/driver/register",
        method: "POST",
        data: driverInfo,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    isOnlineStatus: builder.mutation({
      query: (isOnlineStatus) => ({
        url: "/driver/status",
        method: "PATCH",
        data: isOnlineStatus,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    updateLocationStatus: builder.mutation({
      query: (locationStatus) => ({
        url: "/driver/location",
        method: "PATCH",
        data: locationStatus,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    driverInfo: builder.query({
      query: () => ({
        url: "/driver/status",
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
      providesTags: ["RIDER"],
    }),
  }),
});

export const {
  useVehicleRegisterMutation,
  useDriverInfoQuery,
  useGetRideByIdForDriverQuery,
  useIsOnlineStatusMutation,
  useUpdateLocationStatusMutation,
  useAllRideForDriverQuery,
  useRideCancelMutation,
  useAcceptRideMutation
} = driverApi;
