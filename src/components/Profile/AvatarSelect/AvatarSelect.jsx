import { useState } from 'react'

import { profileEdit } from '../../../utils/profileServices'

import AvatarImage from '../../common/AvatarImage/AvatarImage'

const avatars = [
    'avatars/default-avatar.png',
    'avatars/diglett-avatar.png',
    'avatars/eevee-avatar.png',
    'avatars/gastly-avatar.png',
    'avatars/jigglypuff-avatar.png',
    'avatars/meowth-avatar.png',
    'avatars/oddish-avatar.png',
    'avatars/psyduck-avatar.png'
]

export default function AvatarSelect({ profile, setUser, setError }) {
    const [selectingAvatar, setSelectingAvatar] = useState(false)

    async function handleAvatarSelect(avatarSrc) {
        try {
            const data = await profileEdit({ avatar: avatarSrc }, profile._id)
            setUser((prevUser) => ({
                ...prevUser,
                profile: data
            }))
            setSelectingAvatar(false)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    return (
        <div>
            {selectingAvatar ? <>
                {avatars.map((avatarSrc, index) => (
                    <div key={index} onClick={() => handleAvatarSelect(avatarSrc)}>
                        <AvatarImage src={avatarSrc} alt='avatar' />
                    </div>
                ))}
                <button onClick={() => setSelectingAvatar(false)}>Cancel</button>
            </> : <>
                <AvatarImage src={profile.avatar ? profile.avatar : 'avatars/default-avatar.png'} alt={profile.username} />
                <button onClick={() => setSelectingAvatar(true)}>Edit</button>
            </>}
        </div>
    )
}