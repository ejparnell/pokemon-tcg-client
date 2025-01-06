import { useContext, useState } from 'react'

import { UserContext } from '../../../contexts/UserProvider'

import ProfileShow from '../ProfileShow/ProfileShow'
import ProfileEdit from '../ProfileEdit/ProfileEdit'
import Nav from '../../Nav/Nav'
import H1 from '../../common/H1/H1'

export default function ProfileHome() {
    const { user, setUser } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div>
            <Nav />
            <H1>Profile</H1>
            {isEditing ? <ProfileEdit setUser={setUser} profile={user.profile} setIsEditing={setIsEditing} /> : <ProfileShow profile={user.profile} setIsEditing={setIsEditing} />}
        </div>
    )
}
