import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";


export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    // console.log("User Session", session)

    return session?.user || null;
}

// Get User Token through session

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}


export const requiredRole = async (role) => {

    const user = await getUserSession();

    if (user.role !== role) {
        redirect('/unauthorized')
    }
    return user;
}