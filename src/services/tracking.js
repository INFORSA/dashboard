// services/tracking.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const trackingApi = createApi({
  reducerPath: "trackingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: "include",
    validateStatus: (response) => {
      return response.status >= 200 && response.status < 300;
    }
  }),
  tagTypes: ["Tracking"],
  endpoints: (builder) => ({
    getTrackingPenilaian: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams();
        
        if (params.tabel) queryString.append('tabel', params.tabel);
        if (params.startDate) queryString.append('startDate', params.startDate);
        if (params.endDate) queryString.append('endDate', params.endDate);
        if (params.limit) queryString.append('limit', params.limit);
        if (params.offset) queryString.append('offset', params.offset);

        return `/tracking/penilaian?${queryString.toString()}`;
      },
      providesTags: ["Tracking"],
    }),
  }),
});

export const { useGetTrackingPenilaianQuery } = trackingApi;
export default trackingApi;