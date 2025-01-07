import { useContext, useState } from 'react'

import { UserContext } from '../../../contexts/UserProvider'

import { ProfileContentContainer } from './ProfileHomeStyles.jsx'
import ProfileShow from '../ProfileShow/ProfileShow'
import ProfileEdit from '../ProfileEdit/ProfileEdit'
import Nav from '../../Nav/Nav'
import H1 from '../../common/H1/H1'
import AccountSettings from '../AccountSettings/AccountSettings.jsx'
import Button from '../../common/Button/Button.jsx'

export default function ProfileHome() {
    const { user, setUser } = useContext(UserContext)
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isEditingAccount, setIsEditingAccount] = useState(false)

    if (!user) return <div>loading...</div>

    return (
        <div>
            <Nav />
            <ProfileContentContainer>
                <H1>Profile</H1>
                <Button onClick={() => setIsEditingAccount(true)}>Account Settings</Button>
                {isEditingProfile ? 
                <ProfileEdit setUser={setUser} profile={user.profile} setIsEditingProfile={setIsEditingProfile} /> 
                : <ProfileShow profile={user.profile} setIsEditingProfile={setIsEditingProfile} />}
                {isEditingAccount && <AccountSettings user={user} setUser={setUser} setIsEditingAccount={setIsEditingAccount} />}
            </ProfileContentContainer>
        </div>
    )
}
