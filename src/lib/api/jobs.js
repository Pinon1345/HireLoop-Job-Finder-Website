import { serverFetch } from "../core/server";

const getBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL || "https://hireloop-server-ftlc7pw6w-pinonfurkan1-4281s-projects.vercel.app";
    return url.endsWith('/') ? url.slice(0, -1) : url;
};

const baseUrl = getBaseUrl();

export const getJobs = async (queryString = "") => {
    const endpoint = queryString ? `/api/jobs?${queryString}` : "/api/jobs";
    return await serverFetch(endpoint);
};

export const getJobById = async (jobId) => {
    if (!jobId) return null;
    return await serverFetch(`/api/jobs/${jobId}`);
};

export const getCompanyJobs = async (companyId, status = 'active') => {
    try {
        if (!companyId) return [];
        const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("[getCompanyJobs Error]:", error);
        return [];
    }
};