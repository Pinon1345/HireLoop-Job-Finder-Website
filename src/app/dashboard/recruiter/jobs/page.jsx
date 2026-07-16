import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const JobRecruiterPage = async () => {
    const companyId = 'comp_101'
    const jobs = await getCompanyJobs(companyId)
    console.log("Jobs for Company", jobs)
    return (
        <div>
            <div className='container w-11/12 mx-auto mt-4 mb-6 space-y-2'>
                <h2 className='text-4xl font-semibold'>Manage All Jobs</h2>
                <p className='text-gray-200'>View, Updata and Manage your current jobs posting.</p>
            </div>
            <div className='mx-4 mt-8'>
                <table className="w-full shadow-lg shadow-blue-600 rounded-2xl">
                    <thead>
                        <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
                            <th className="py-4 pl-4">Job Title</th>
                            <th>Type / Category</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Applicants</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map(job => (
                            <tr
                                key={job?._id}
                                className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
                            >
                                <td className="py-5 font-medium text-white pl-4">
                                    {job?.jobTitle}
                                </td>

                                <td>
                                    <p>{job?.jobType}</p>
                                    <p className="text-xs text-zinc-500">
                                        {job?.jobCategory}
                                    </p>
                                </td>

                                <td>
                                    {job?.currency} {job?.minSalary} - {job?.maxSalary}
                                </td>

                                <td>
                                    {job.isRemote ? "Remote" : job?.location}
                                </td>

                                <td>
                                    {job?.deadline}
                                </td>

                                <td>
                                    <span
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold
                        ${job?.status === "active"
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {job?.status}
                                    </span>
                                </td>

                                <td>
                                    {job.applicants || 0}
                                </td>

                                <td>
                                    <div className="flex justify-center gap-4">
                                        <button>
                                            <FaEye />
                                        </button>

                                        <button>
                                            <FaEdit />
                                        </button>

                                        <button className="text-red-500">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobRecruiterPage;