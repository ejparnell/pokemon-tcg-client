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

export const fetchCard = async (id) => {
    const response = await fetch(`${BACKEND_URL}/api/cards/${id}`)
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch card')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchBoosterPack = async (set) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/cards/booster-packs/${set}/buy`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch booster pack')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchFullSet = async (set) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/cards/booster-packs/${set}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch booster pack')
    }

    const responseData = await response.json()
    return responseData
}