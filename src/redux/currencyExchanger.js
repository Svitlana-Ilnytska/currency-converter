import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange",
  }),
  endpoints: (builder) => ({
    getCurrencyByDate: builder.query({
      query: (date) => `?date=${date}&json`,
    }),
  }),
});

export const { useGetCurrencyByDateQuery } = currencyApi;
