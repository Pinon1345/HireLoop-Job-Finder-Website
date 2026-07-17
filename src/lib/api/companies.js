"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const createCompany = async (newCompanyData) => {
    const res = await fetch(`${baseURL}/api/companies`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newCompanyData)
    });
    return res.json()
}