import { HOUSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const housesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addHouse: builder.mutation({
            query: (body) => ({
                    url: HOUSES_URL,
                    method: 'POST',
                    body,
                })
        }),

        getAllHouses: builder.query({
            query: () => ({
                url: HOUSES_URL
            }),
            keepUnusedDataFor: 5,
        }),

        getHousesByWard: builder.query({
            query: (ward) => ({
                url: `${HOUSES_URL}/wards/${ward}`, 
            }),
            keepUnusedDataFor: 5,
        })
	})
})

export const {
	useGetAllHousesQuery,
    useAddHouseMutation,
    useGetHousesByWardQuery,
} = housesApiSlice