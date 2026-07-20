import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api/jobs";

export default async function JobList({ searchParams }) {
    // Await searchParams for Next.js App Router
    const params = await searchParams;

    const query = params?.q?.toLowerCase() || "";
    const category = params?.category || "All";
    const type = params?.type || "All";
    const remote = params?.remote || "All";

    const allJobs = await getJobs();

    // Perform server-side filter
    const filteredJobs = allJobs?.filter((job) => {
        const matchesSearch =
            !query ||
            job.jobTitle?.toLowerCase().includes(query) ||
            job.companyName?.toLowerCase().includes(query);

        const matchesCategory =
            category === "All" ||
            job.jobCategory?.toLowerCase() === category.toLowerCase();

        const matchesType =
            type === "All" ||
            job.jobType?.toLowerCase() === type.toLowerCase();

        const matchesRemote =
            remote === "All" ||
            (remote === "Remote" ? job.isRemote : !job.isRemote);

        return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <JobFilter />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Showing {filteredJobs?.length || 0} Jobs
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs?.map((job) => {
                    const jobId = typeof job._id === "object" ? job._id.$oid : job._id;
                    return <JobCard key={jobId} job={job} />;
                })}
            </div>
        </div>
    );
}