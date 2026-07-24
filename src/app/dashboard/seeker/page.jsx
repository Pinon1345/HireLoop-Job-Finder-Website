import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import SeekerDashboardClient from './SeekerDashboardClient';

const SeekerDashboardPage = async () => {
    const user = await getUserSession();
    const applications = (await getApplicationsByApplicant(user?.id)) || [];

    return <SeekerDashboardClient user={user} applications={applications} />;
};

export default SeekerDashboardPage;