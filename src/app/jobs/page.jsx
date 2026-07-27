import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api/jobs";
import Link from "next/link";

export default async function JobList({ searchParams }) {
    // 1. Await searchParams
    const params = await searchParams;

    // 2. Extract query parameters
    const currentPage = Math.max(1, parseInt(params?.page || "1", 10));
    const search = params?.search || "";
    const category = params?.category || "All";
    const type = params?.type || "All";
    const remote = params?.remote || "All";

    // 3. Build API query string (forwarding filters and current page to Express)
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (category !== "All") queryParams.set("category", category);
    if (type !== "All") queryParams.set("type", type);
    if (remote !== "All") queryParams.set("remote", remote);

    // Add pagination params for the backend query
    queryParams.set("page", currentPage.toString());
    queryParams.set("limit", "10");

    // 4. Fetch jobs from backend
    const data = await getJobs(queryParams.toString());

    // Safely extract backend values (handles both object response and legacy array fallback)
    const jobs = Array.isArray(data) ? data : data?.jobs || [];
    const totalItems = data?.total ?? jobs.length;
    const totalPages = data?.totalPages ?? 1;

    // Item count calculation for summary
    const itemsPerPage = 10;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Helper to keep active filters intact when clicking page links
    const createPageURL = (pageNumber) => {
        const urlParams = new URLSearchParams();
        if (search) urlParams.set("search", search);
        if (category !== "All") urlParams.set("category", category);
        if (type !== "All") urlParams.set("type", type);
        if (remote !== "All") urlParams.set("remote", remote);
        urlParams.set("page", pageNumber.toString());
        return `?${urlParams.toString()}`;
    };

    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <JobFilter />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Showing {jobs.length} Jobs
                </h1>
            </div>

            {/* Render Job Cards */}
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {jobs.map((job) => {
                        const jobId = typeof job._id === "object" ? job._id.$oid || job._id.toString() : job._id;
                        return <JobCard key={jobId} job={job} />;
                    })}
                </div>
            ) : (
                <div className="text-center py-12 text-zinc-400">
                    No jobs found matching your selected criteria.
                </div>
            )}

            {/* Server-Side Pagination Bar */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800 pt-6 gap-4">
                    <p className="text-sm text-zinc-400">
                        Showing <span className="font-semibold text-white">{startItem}</span> to{" "}
                        <span className="font-semibold text-white">{endItem}</span> of{" "}
                        <span className="font-semibold text-white">{totalItems}</span> results
                    </p>

                    <div className="flex items-center gap-2">
                        {/* Previous Link */}
                        {currentPage > 1 ? (
                            <Link
                                href={createPageURL(currentPage - 1)}
                                className="px-4 py-2 text-xs font-medium bg-zinc-900 border border-zinc-800 text-white rounded-xl hover:bg-zinc-800 transition"
                            >
                                Previous
                            </Link>
                        ) : (
                            <span className="px-4 py-2 text-xs font-medium bg-zinc-900/50 border border-zinc-800/50 text-zinc-600 rounded-xl cursor-not-allowed">
                                Previous
                            </span>
                        )}

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                const isActive = pageNum === currentPage;
                                return (
                                    <Link
                                        key={pageNum}
                                        href={createPageURL(pageNum)}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${isActive
                                                ? "bg-pink-500 text-white"
                                                : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
                                            }`}
                                    >
                                        {pageNum}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Next Link */}
                        {currentPage < totalPages ? (
                            <Link
                                href={createPageURL(currentPage + 1)}
                                className="px-4 py-2 text-xs font-medium bg-zinc-900 border border-zinc-800 text-white rounded-xl hover:bg-zinc-800 transition"
                            >
                                Next
                            </Link>
                        ) : (
                            <span className="px-4 py-2 text-xs font-medium bg-zinc-900/50 border border-zinc-800/50 text-zinc-600 rounded-xl cursor-not-allowed">
                                Next
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}