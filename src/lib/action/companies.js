"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
    return serverMutation('/api/companies', newCompanyData)
};

export const updateCompany = async (id, data) => {
    const result = await serverMutation(`/api/companies/${id}`, data, 'PATCH')
    revalidatePath('/dashboard/admin/companies')
    return result;
}


// const baseURL = process.env.NEXT_PUBLIC_BASE_URL

// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseURL}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(newCompanyData)
//     });
//     return res.json()
// }