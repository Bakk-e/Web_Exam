
export async function getData() {
    const res = await fetch("https://webapp-api.vercel.app/api/users")
    return res.json()
}