import Text from '../../common/Text/Text'
import AvatarImage from '../../common/AvatarImage/AvatarImage'
import Button from '../../common/Button/Button'

export default function ProfileShow({ profile, setIsEditing }) {
    return (
        <div>
            <AvatarImage src={profile.avatar ? profile.avatar : 'avatars/default-avatar.png'} alt={profile.username} />
            <Text>Username: {profile.username}</Text>
            <Text>Rank: {profile.rank}</Text>
            <Text>Wins: {profile.wins}</Text>
            <Text>Losses: {profile.losses}</Text>
            <Text>Games Played: {profile.gamesPlayed}</Text>
            <Text>Greeting: {profile.greeting}</Text>
            <Button onClick={() => setIsEditing(true)}>Update Profile</Button>
        </div>
    )
}