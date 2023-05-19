import { api } from "./api";
import { Admin } from "@/models";

export const adminEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query<Admin, string>({
      query: (email) => `/admins/${email}/email`,
      providesTags: ["admin"],
    }),
  }),
});
