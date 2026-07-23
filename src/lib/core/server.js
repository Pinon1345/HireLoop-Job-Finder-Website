
const baseURL = process.env.NEXT_PUBLIC_BASE_URL


export const serverFetch = async (path) => {
    const res = await fetch(`${baseURL}${path}`);

    return res.json()
}

export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // handle 401, 403, 402

    return res.json()
}