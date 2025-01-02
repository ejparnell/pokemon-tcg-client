import { useContext } from 'react'

import { logout } from '../../utils/logout'
import { UserContext } from '../../contexts/UserProvider'

import Button from '../common/Button/Button'
import H1 from '../common/H1/H1'

export default function Home() {
    const { setUser } = useContext(UserContext)
    return (
        <div>
            <H1>Home</H1>
            <Button onClick={() => logout(setUser)}>Sign Out</Button>
        </div>
    )
}