import { redirect } from "next/navigation";
import { getUserToken } from "./session";

// Fallback to Express backend URL if NEXT_PUBLIC_BASE_URL is undefined
const getBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL || "https://hireloop-server-ftlc7pw6w-pinonfurkan1-4281s-projects.vercel.app";
    return url.endsWith('/') ? url.slice(0, -1) : url;
};

const baseURL = getBaseUrl();

export const authHeader = async () => {
    const token = await getUserToken();
    return token ? { authorization: `Bearer ${token}` } : {};
};

export const serverFetch = async (path) => {
    try {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const res = await fetch(`${baseURL}${cleanPath}`, {
            cache: 'no-store', // Avoid caching empty/stale API responses
        });

        return await handleStatusCode(res);
    } catch (error) {
        console.error(`[serverFetch Error] Request to ${baseURL}${path} failed:`, error);
        return { jobs: [], total: 0, totalPages: 1 };
    }
};

export const protectedFetch = async (path) => {
    try {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const res = await fetch(`${baseURL}${cleanPath}`, {
            headers: await authHeader(),
            cache: 'no-store',
        });

        return await handleStatusCode(res);
    } catch (error) {
        console.error(`[protectedFetch Error] Path: ${path}`, error);
        return null;
    }
};

export const serverMutation = async (path, data, method = 'POST') => {
    try {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const res = await fetch(`${baseURL}${cleanPath}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...await authHeader(),
            },
            body: JSON.stringify(data),
        });

        return await handleStatusCode(res);
    } catch (error) {
        console.error(`[serverMutation Error] Path: ${path}`, error);
        return { error: "Request failed" };
    }
};

// Handle status codes and safely parse JSON
const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized');
    }

    if (res.status === 403) {
        redirect('/forbidden');
    }

    if (!res.ok) {
        console.error(`[HTTP Error Status]: ${res.status} ${res.statusText}`);
        return { jobs: [], total: 0, totalPages: 1 };
    }

    try {
        return await res.json();
    } catch (jsonErr) {
        console.error("[JSON Parse Error]: Backend did not return JSON", jsonErr);
        return { jobs: [], total: 0, totalPages: 1 };
    }
};