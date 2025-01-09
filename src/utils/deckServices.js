const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL

export const createDeck = async (data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/decks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create deck')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchDecks = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/decks`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch decks')
    }

    const responseData = await response.json()
    return responseData
}

export const fetchDeck = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/decks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch deck')
    }

    const responseData = await response.json()
    return responseData
}

export const updateDeck = async (id, data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/decks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update deck')
    }

    const responseData = await response.json()
    return responseData
}

export const deleteDeck = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_URL}/api/decks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete deck')
    }

    const responseData = await response.json()
    return responseData
}
