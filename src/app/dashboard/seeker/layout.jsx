import { requiredRole } from '@/lib/core/session';
import React from 'react';

const SeekerLayoutPage = async ({ children }) => {
    await requiredRole('seeker');
    return children;
};

export default SeekerLayoutPage;