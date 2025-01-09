import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { fetchDecks } from '../../../utils/deckServices'

import H1 from '../../common/H1/H1'
import Text from '../../common/Text/Text'

export default function DecksHome() {
    const [decks, setDecks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getDecks() {
            try {
                const data = await fetchDecks()
                setDecks(data.decks)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getDecks()
    }, [])
    
    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Decks Home</H1>
            {error && <div>{Object.values(error)}</div>}
            <Link to='/decks/create'>Create a Deck</Link>
            <Text>Your Decks</Text>
            {decks.map((deck) => (
                <div key={deck._id}>
                    <Text>{deck.name}</Text>
                    <Link to={`/decks/${deck._id}`}>View Deck</Link>
                </div>
            ))}
        </div>
    )
}
