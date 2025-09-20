import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ searchTerm, role, page = 1, limit = 10 }) => {
        // eslint-disable-next-line prefer-const
        let params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (role) params.append("role", role);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/users/all-users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),

    allStats: builder.query({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    allDrivers: builder.query({
      query: () => ({
        url: "/drivers/get-all-drivers",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    allRides: builder.query({
      query: () => ({
        url: "/users/rides",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: { isActive },
      }),
      invalidatesTags: ["USER"],
    }),

    updateDriverApprovalStatus: builder.mutation({
      query: ({ id, driverStatus }) => ({
        url: `/drivers/driver-status/${id}`,
        method: "POST",
        data: { driverStatus },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `users/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllStatsQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useAllDriversQuery,
  useUpdateDriverApprovalStatusMutation,
} = adminApi;
