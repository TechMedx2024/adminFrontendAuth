import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user' }),
    endpoints: (builder) => ({
        // =================================

        createUser: builder.mutation({
            query: (user) => {
                // console.log("create user data", user)
                return {
                    url: 'createUser',
                    method: 'POST',
                    body: user, // Corrected to send the actual user object
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        }),

        // =========================================

        verifySignupOTP: builder.mutation({
            query: (user) => {
                return {
                    url: 'verifyOTP',
                    method: 'POST', // Correct the HTTP method here
                    body: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
        }),

        // ====================================
        getUser: builder.query({
            query: () => {
                return {
                    url: 'userProfile',
                    method: 'GET', // Correct the HTTP method here
                    credentials: 'include'
                };
            }
        }),
        // ======================================
        getAllUser: builder.query({
            query: () => {
                return {
                    url: 'fetchAllUsers',
                    method: 'GET', // Correct the HTTP method here
                    credentials: 'include'
                };
            }
        }),

        // ====================================
        logoutUser: builder.mutation({
            query: () => {
                return {
                    url: 'logout',
                    method: 'POST', // Correct the HTTP method here
                    body: {},
                    credentials: 'include'
                };
            }
        }),
        // ======================================

    })
})

export const { useCreateUserMutation, useVerifySignupOTPMutation, useGetUserQuery, useLogoutUserMutation, useGetAllUserQuery } = authApi
