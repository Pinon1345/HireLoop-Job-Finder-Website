import JobDetailsClient from '@/components/JobDetailsClient';
import { getJobById } from '@/lib/api/jobs';
import React from 'react';


const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    return <JobDetailsClient job={job} />;
};

export default JobDetailsPage;