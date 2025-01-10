const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL

export const createTrade = async (data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create trade')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchTrades = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/trades`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch trades')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchTrade = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/trades/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch trade')
    }

    const responseData = await response.json()
    return responseData
}

export const tradeCard = async (id, data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/trades/${id}/trade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to trade card')
    }
    console.log(response)

    const responseData = await response.json()
    return responseData
}