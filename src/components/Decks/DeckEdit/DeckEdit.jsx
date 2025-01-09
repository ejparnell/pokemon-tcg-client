import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserProvider'
import { fetchDeck, updateDeck, deleteDeck } from '../../../utils/deckServices'

import H1 from '../../common/H1/H1'
import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'
import Drawer from '../../common/Drawer/Drawer'

export default function DeckEdit() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [deck, setDeck] = useState(null)
    const [ownedCards, setOwnedCards] = useState([])
    const [cards, setCards] = useState([])
    const [form, setForm] = useState({
        name: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (user) {
            setOwnedCards(user.profile.cards)
        }

        async function getDeck() {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchDeck(id)
                setDeck(data.deck)
                setCards(data.deck.cards)
                setForm({ name: data.deck.name || '' })
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getDeck()
    }
    , [])

    function handleChange(event) {
        const { name, value } = event.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleAddCard(card) {
        setCards((prev) => [...prev, card])
    }

    function handleRemoveCard(currentCard) {
        setCards((prev) => prev.filter((card) => card._id !== currentCard._id))
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const data = await updateDeck(id, { name: form.name, cards: cards.map((card) => card._id) })
            setDeck(data.deck)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteDeck(id) {
        setLoading(true)
        setError(null)

        try {
            await deleteDeck(id)
            navigate('/decks')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Edit: {deck?.name}</H1>
            <Button onClick={() => handleDeleteDeck(id)}>Delete Deck</Button>
            <Drawer>
                <div>
                    {cards.map((card) => (
                        <div key={card._id} onClick={() => handleRemoveCard(card)}>
                            <PokemonCard pokemon={card} />
                        </div>
                    ))}
                </div>
            </Drawer>
            <Form onSubmit={handleSubmit}>
                <FormInput label='Name' type='text' name='name' value={form.name} onChange={handleChange} />
                <Button type='submit'>Update Deck</Button>
            </Form>
            {error && <div>{Object.values(error)}</div>}
            <H1>Your Cards</H1>
            <div>
                {ownedCards.map((card) => (
                    <div key={card._id} onClick={() => handleAddCard(card)}>
                        <PokemonCard pokemon={card} />
                    </div>
                ))}
            </div>
        </div>
    )
}