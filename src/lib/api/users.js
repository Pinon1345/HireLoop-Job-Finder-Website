import { headers } from "next/headers";
import { auth } from "../auth";
import { serverFetch } from "../core/server";

export const getUserByEmail = async (email) => {
    return serverFetch(`/api/users?email=${email}`);
};


export const getUsersList = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc",
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return users;
}