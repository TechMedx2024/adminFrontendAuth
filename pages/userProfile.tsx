import { useGetUserQuery } from '@/shared/redux/services/auth';
import { useGetAllUserQuery } from '@/shared/redux/services/auth';
import React, { useState, useEffect } from 'react';
import { User } from '../Interface/types'; // Adjust the import path as necessary

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);

    const { data: userData, isSuccess: isUserSuccess } = useGetUserQuery(undefined);
    const { data: allUsersData, isSuccess: isAllUsersSuccess } = useGetAllUserQuery(undefined);

    useEffect(() => {
        if (userData && isUserSuccess) {
            setUser(userData.user);
        }
    }, [userData, isUserSuccess]);

    useEffect(() => {
        if (allUsersData && isAllUsersSuccess) {
            setUsers(allUsersData.users);
        }
    }, [allUsersData, isAllUsersSuccess]);

    return (
        <div>
            {user ? (
                <div>
                    <h1>User Profile</h1>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.roles[0]}</p>
                    {/* Add other user details here */}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}

            {users ? (
                <div>
                    <h1>All Users</h1>
                    <ul>
                        {users.map((u) => (
                            <li>
                                {u.name} - {u.email}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading all users...</p>
            )}
        </div>
    );
}
