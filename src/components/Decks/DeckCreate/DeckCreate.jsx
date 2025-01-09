import { useState, useEffect, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserProvider'
import { createDeck } from '../../../utils/deckServices'
import { types, rarities } from '../../Home/HomeConstants'

import H1 from '../../common/H1/H1'
import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'
import Drawer from '../../common/Drawer/Drawer'
import Text from '../../common/Text/Text'

export default function DeckCreate() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [ownedCards, setOwnedCards] = useState([])
    const [cards, setCards] = useState([])
    const [form, setForm] = useState({
        name: ''
    })
    const [filteredCards, setFilteredCards] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (user) {
            setOwnedCards(user.profile.cards)
            setFilteredCards(user.profile.cards)
        }
    }, [])

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

        if (!form.name) {
            setError('Name is required')
            setLoading(false)
            return
        }

        try {
            await createDeck({ name: form.name, cards: cards.map((card) => card._id) })
            setForm({ name: '' })
            navigate('/decks')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    function handleChangeCards(event, category) {
        const value = event.target.textContent

        setFilteredCards(
            ownedCards.filter((card) => {
                if (category === 'set') {
                    return card.set === value
                } else if (category === 'type') {
                    return card.types[0] === value
                } else if (category === 'rarity') {
                    return card.rarity === value
                }
                return false
            })
        )
    }

    function handleSearchChange(event) {
        setSearch(event.target.value)
        setFilteredCards(ownedCards.filter((card) => card.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    if (loading) {
        return <div>Loading...</div>
    }

    function handleAutoBuildDeck(event) {
        const type = event.target.textContent
        const filtered = ownedCards.filter((card) => card.types[0] === type)
    
        const getBasePokemon = (cards) =>
            cards.filter((card) => !card.evolvesFrom)
    
        const getEvolutionLines = (cards, basePokemon) =>
            basePokemon.filter((base) =>
                cards.some((card) => card.evolvesFrom === base.name)
            )
    
        const getRepeatingPokemon = (cards) => {
            const counts = cards.reduce((acc, card) => {
                acc[card.name] = (acc[card.name] || 0) + 1
                return acc
            }, {})
            return [...cards].sort((a, b) => counts[b.name] - counts[a.name])
        }
    
        const basePokemon = getBasePokemon(filtered)
        const evolutionLines = getEvolutionLines(filtered, basePokemon)
        const repeatingPokemon = getRepeatingPokemon(filtered)
    
        let pokemonCards = [...evolutionLines]
    
        if (pokemonCards.length < 20) {
            pokemonCards = [
                ...pokemonCards,
                ...repeatingPokemon.slice(0, 20 - pokemonCards.length),
            ]
        }
    
        if (pokemonCards.length < 20) {
            const commonPokemon = filtered.filter(
                (card) => card.rarity === 'Common'
            )
            pokemonCards = [
                ...pokemonCards,
                ...commonPokemon.slice(0, 20 - pokemonCards.length),
            ]
        }
    
        pokemonCards = pokemonCards.slice(0, 20)
    
        const energyCards = ownedCards
            .filter(
                (card) =>
                    card.supertype === 'Energy' && card.types[0] === type
            )
            .slice(0, 20)
    
        const trainerCards = ownedCards
            .filter((card) => card.supertype === 'Trainer')
            .slice(0, 20)
    
        const deck = [...pokemonCards, ...energyCards, ...trainerCards]
        setCards(deck)
    }
    
    return (
        <div>
            <H1>Create Deck</H1>
            <Drawer>
                <Button onClick={() => setCards([])}>Clear Deck</Button>
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
                <Button type='submit'>Create Deck</Button>
            </Form>
            {error && <div>{Object.values(error)}</div>}

            <H1>Filter cards</H1>
            <Button onClick={() => setFilteredCards(ownedCards)}>All Owned Cards</Button>

            <Text>Filter by Type</Text>
            {types.map((item) => (
                <Button key={item.type} onClick={(event) => handleChangeCards(event, 'type')}>
                    {item.name}
                </Button>
            ))}
            <Text>Filter by Rarity</Text>
            {rarities.map((item) => (
                <Button key={item.rarity} onClick={(event) => handleChangeCards(event, 'rarity')}>
                    {item.name}
                </Button>
            ))}
            <Form>
                <FormInput label='Search Name' type='text' name='search' value={search} onChange={handleSearchChange} />
            </Form>

            <H1>Auto Build a deck by clicking on a type:</H1>
            {
                types.map((item) => (
                    <Button key={item.type} onClick={handleAutoBuildDeck}>
                        {item.name}
                    </Button>
                ))
            }

            <H1>Your Cards</H1>
            {filteredCards.map((card) => (
                <div key={card._id} onClick={() => handleAddCard(card)}>
                    <Link key={card._id} to={`/cards/${card._id}`}>View Card</Link>
                    <PokemonCard pokemon={card} />
                </div>
            ))}
        </div>
    )
}