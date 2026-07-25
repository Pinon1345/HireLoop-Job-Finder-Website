import { getCompanies } from '@/lib/api/companies';
import React from 'react';
import CompanyTable from './CompanyTable';


const AdminCompaniesProfile = async () => {
    const companies = await getCompanies();

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8">
            <CompanyTable companies={companies} />
        </div>
    );
};

export default AdminCompaniesProfile;