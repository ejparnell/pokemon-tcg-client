const BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL

export const signup = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to sign up')
    }

    const responseData = await response.json()
    localStorage.setItem('token', responseData.token)
    return responseData
}

export const signin = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to sign in')
    }

    const responseData = await response.json()
    localStorage.setItem('token', responseData.token)
    return responseData
}

export const verify = async () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
        const response = await fetch(`${BACKEND_URL}/api/users/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token')
            }
            return null
        }

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error verifying user:', error)
        return null
    }
}