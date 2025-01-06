import Text from '../../common/Text/Text'
import AvatarImage from '../../common/AvatarImage/AvatarImage'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'

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
            {profile.cards.length > 0 ? <>
                <Text>Owned Cards: {profile.cards.length}</Text>
                {profile.cards.map((card, index) => (
                    <PokemonCard key={index} pokemon={card} />
                ))}
            </> : <>
                <Text>No cards yet! Add some cards to your collection!</Text>
            </>}
        </div>
    )
}