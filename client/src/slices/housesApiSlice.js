import {
    HOUSES_URL
} from "../constants";
import {
    apiSlice
} from "./apiSlice";

const housesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addHouse: builder.mutation({
            query: (body) => ({
                url: HOUSES_URL,
                method: 'POST',
                body,
                credentials: 'include',
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
        }),

        updateHouse: builder.mutation({
            query: (body) => ({
                url: HOUSES_URL,
                method: 'PUT',
                body,
                credentials: 'include',

            })
        }),

        deleteHouse: builder.mutation({
            query: (id) => ({
                url: `${HOUSES_URL}/${id}`,
                method: 'DELETE',
                credentials: 'include'
            })
        })
    })
})

export const {
    useGetAllHousesQuery,
    useAddHouseMutation,
    useGetHousesByWardQuery,
    useUpdateHouseMutation,
    useDeleteHouseMutation,

} = housesApiSlice