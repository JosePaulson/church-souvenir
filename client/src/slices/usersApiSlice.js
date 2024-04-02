import {
    USERS_URL
} from "../constants";
import {
    apiSlice
} from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
        }),

        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),

        getAllEditors: builder.query({
            query: () => ({
                url: USERS_URL,
                credentials: 'include'
            }),
            keepUnusedDataFor: 5
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include'
            })
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
                credentials: 'include',
            })
        })
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useLazyGetAllEditorsQuery,
    useDeleteUserMutation,
} = usersApiSlice