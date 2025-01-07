import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import { fetchCard } from '../../utils/cardServices'
import { UserContext } from '../../contexts/UserProvider'

import H1 from '../common/H1/H1'
import PokemonCard from '../common/PokemonCard/PokemonCard'
import Text from '../common/Text/Text'

export default function PokemonDetail() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ownedCount, setOwnedCount] = useState(0)

    useEffect(() => {
        async function getPokemon() {
            setError(null)
            try {
                const data = await fetchCard(id)
                setPokemon(data.card)

                if (user?.profile?.cards) {
                    const count = user.profile.cards.filter((card) => card._id === id).length
                    setOwnedCount(count)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPokemon()
    }, [id, user])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {error && <div>{Object.values(error)}</div>}
            <H1>{pokemon.name}</H1>
            <PokemonCard pokemon={pokemon} />

            {/* Owned Card Message */}
            {ownedCount > 0 ? (
                <Text>You own {ownedCount} of this card.</Text>
            ) : (
                <Text>You do not own this card.</Text>
            )}

            <Text>Super Type: {pokemon.supertype}</Text>

            {pokemon.subtypes?.length > 0 && (
                <Text>Sub Types: {pokemon.subtypes.join(', ')}</Text>
            )}

            <Text>Level: {pokemon.level}</Text>
            <Text>HP: {pokemon.hp}</Text>

            {pokemon.rules?.length > 0 && (
                <div>
                    <Text>Rules:</Text>
                    <ul>
                        {pokemon.rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            )}

            {pokemon.types?.length > 0 && (
                <Text>Types: {pokemon.types.join(', ')}</Text>
            )}

            <Text>Evolves From: {pokemon.evolvesFrom}</Text>

            {pokemon.abilities?.length > 0 && (
                <div>
                    <Text>Abilities:</Text>
                    <ul>
                        {pokemon.abilities.map((ability, index) => (
                            <li key={index}>
                                <strong>{ability.name}</strong>: {ability.text} ({ability.type})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {pokemon.attacks?.length > 0 && (
                <div>
                    <Text>Attacks:</Text>
                    <ul>
                        {pokemon.attacks.map((attack, index) => (
                            <li key={index}>
                                <strong>{attack.name}</strong> - Damage: {attack.damage || 'None'}, Cost: {attack.cost?.join(', ') || 'None'}, Text: {attack.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {pokemon.weaknesses?.length > 0 && (
                <div>
                    <Text>Weaknesses:</Text>
                    <ul>
                        {pokemon.weaknesses.map((weakness, index) => (
                            <li key={index}>
                                Type: {weakness.type}, Value: {weakness.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {pokemon.retreatCost?.length > 0 && (
                <Text>Retreat Cost: {pokemon.retreatCost.join(', ')}</Text>
            )}

            <Text>Converted Retreat Cost: {pokemon.convertedRetreatCost}</Text>
            <Text>Set: {pokemon.set}</Text>
            <Link to={`/booster-packs/${pokemon.set}`}>
                <Text>Go to Booster Pack</Text>
            </Link>
            <Text>Number: {pokemon.number}</Text>
            <Text>Rarity: {pokemon.rarity}</Text>
            <Text>Flavor Text: {pokemon.flavorText}</Text>

            {pokemon.nationalPokedexNumbers?.length > 0 && (
                <Text>National Pokedex Numbers: {pokemon.nationalPokedexNumbers.join(', ')}</Text>
            )}

            <Text>Price: {pokemon.price}</Text>
        </div>
    )
}
