import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../contexts/UserProvider'

import { NavContainer, NavUl, NavLi } from './NavStyles'

export default function Nav() {
    const { user, setUser } = useContext(UserContext)

    return (
        <NavContainer>
            <NavUl>
                {user ? <>
                    <NavLi>
                        <Link to='/'>Home</Link>
                    </NavLi>
                    <NavLi>
                        <Link to='/profile'>Profile</Link>
                    </NavLi>
                </> : <>
                    <NavLi>
                        <Link to='/'>Home</Link>
                    </NavLi>
                    <NavLi>
                        <Link to='/signup'>Sign Up</Link>
                    </NavLi>
                    <NavLi>
                        <Link to='/signin'>Sign In</Link>
                    </NavLi>
                </>}
            </NavUl>
        </NavContainer>
    )
}
