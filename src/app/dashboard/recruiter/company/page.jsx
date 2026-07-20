import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {

    const user = await getUserSession()
    // console.log("User Information of a Company:", user);

    const company = await getRecruiterCompany(user?.id);

    // console.log("Company from API:", company);

    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;