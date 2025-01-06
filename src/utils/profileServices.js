const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL

export const profileEdit = async (data, profileId) => {
    const token = localStorage.getItem('token')
    if (!token) return null

    const response = await fetch(`${BACKEND_URL}/api/profiles/${profileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to edit profile')
    }

    const responseData = await response.json()
    return responseData
}