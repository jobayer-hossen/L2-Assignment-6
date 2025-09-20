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

    earingStatus: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),

      providesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useVehicleRegisterMutation,
  useDriverInfoQuery,
  useEaringStatusQuery,
  useIsOnlineStatusMutation,
  useUpdateLocationStatusMutation,
} = driverApi;
