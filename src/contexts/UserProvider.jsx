import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { verify } from '../utils/authServices'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const publicPaths = ['/', '/signup', '/signin', '/battle']

    useEffect(() => {
        async function verifyUser() {
            try {
                const data = await verify()
                if (data?.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error(error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }
        verifyUser()
    }, [])

    useEffect(() => {
        if (!isLoading && !user && !publicPaths.includes(location.pathname)) {
            navigate('/signin')
        }
    }, [isLoading, user, location.pathname, navigate])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}