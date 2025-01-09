import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


import { fetchDeck } from '../../../utils/deckServices'

import H1 from '../../common/H1/H1'
import PokemonCard from '../../common/PokemonCard/PokemonCard'

export default function DeckShow() {
    const { id } = useParams()
    const [deck, setDeck] = useState({})
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        async function getDeck() {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchDeck(id)
                setDeck(data.deck)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getDeck()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Deck: {deck.name}</H1>
            <Link to={`/decks/${deck._id}/edit`}>Edit Deck</Link>
            {error && <div>{Object.values(error)}</div>}
            <div>
                {deck.cards && deck.cards.map((card) => (
                    <div key={card._id}>
                        <PokemonCard pokemon={card} />
                    </div>
                ))}
            </div>
        </div>
    )
}