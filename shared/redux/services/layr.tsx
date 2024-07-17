import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user' }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => {
                console.log("create user data", user);
                return {
                    url: 'createUser',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
        })
    })
});

export const { useCreateUserMutation } = authApi;

