import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { shazamBaseUrl } from '../../assets/constants'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: shazamBaseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '8ce6bd2e0dmshf42a23f4cf57e33p129a5djsnbdf87ec71f8d'
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
  }),
})

export const { useGetTopChartsQuery } = shazamCoreApi
