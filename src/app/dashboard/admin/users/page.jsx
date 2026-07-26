import { getUsersList } from '@/lib/api/users';
import React from 'react';
import UserTableClient from './UserTableClient';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = (await data?.users) || [];

    return <UserTableClient
        key={JSON.stringify(users)} // Force state reset when server props change
        users={users} />;
};

export default AdminUsersPage;