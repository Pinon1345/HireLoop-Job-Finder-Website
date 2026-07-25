import { requiredRole } from '@/lib/core/session';
import React from 'react';

const AdminLayoutPage = async ({ children }) => {
    await requiredRole('admin')
    return children;
};

export default AdminLayoutPage;