import { requiredRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayoutPage = async ({ children }) => {
    await requiredRole('recruiter');
    return children;
};

export default RecruiterLayoutPage;