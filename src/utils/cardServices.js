const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL

export const fetchCards = async () => {
    const response = await fetch(`${BACKEND_URL}/api/cards`)
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch cards')
    }

    const responseData = await response.json()
    return responseData
}