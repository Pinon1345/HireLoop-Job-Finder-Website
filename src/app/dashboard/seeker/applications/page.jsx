import React from 'react';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import SeekerApplicationsClient from './SeekerApplicationsClient';

const SeekerApplicationPage = async () => {
    const user = await getUserSession();
    const jobs = (await getApplicationsByApplicant(user?.id)) || [];

    return <SeekerApplicationsClient jobs={jobs} user={user} />;
};

export default SeekerApplicationPage;