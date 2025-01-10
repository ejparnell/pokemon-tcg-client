import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { fetchCards } from '../../utils/cardServices'
import { sets, types, rarities } from './HomeConstants'
import { UserContext } from '../../contexts/UserProvider'

import H1 from '../common/H1/H1'
import PokemonCard from '../common/PokemonCard/PokemonCard'
import Button from '../common/Button/Button'
import Form from '../common/Form/Form'
import FormInput from '../common/FormInput/FormInput'
import Text from '../common/Text/Text'

export default function Home() {
    const { user } = useContext(UserContext)
    const [allCards, setAllCards] = useState([])
    const [currentCards, setCurrentCards] = useState([])
    const [markedOwnedCards, setMarkedOwnedCards] = useState([])
    const [ownedCards, setOwnedCards] = useState([])
    const [toggleOwned, setToggleOwned] = useState(false)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getAllCards() {
            try {
                const { cards } = await fetchCards()
                setAllCards(cards)
                setCurrentCards(cards)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getAllCards()

        if (user) {
            setOwnedCards(user.profile.cards)
        }

    }, [])

    function handleChangeCards(event, category) {
        const value = event.target.textContent
        const cards = toggleOwned ? markedOwnedCards : allCards

        setCurrentCards(
            cards.filter((card) => {
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

    if (loading) {
        return <div>Loading...</div>
    }

    function handleSearchChange(event) {
        setSearch(event.target.value)
        setCurrentCards(allCards.filter((card) => card.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    function handleToggleOwned() {
        const ownedCardIds = new Set(ownedCards.map((card) => card._id))
        const updatedCards = allCards.map((card) => ({
            ...card,
            isOwned: ownedCardIds.has(card._id)
        }))

        setMarkedOwnedCards(updatedCards)

        setToggleOwned((prev) => {
            const newToggleState = !prev

            if (newToggleState) {
                setCurrentCards(updatedCards.filter((card) => card.isOwned))
            } else {
                setCurrentCards(allCards)
            }

            return newToggleState
        })
    }



    return (
        <div>
            <H1>Home</H1>
            {error && <div>{Object.values(error)}</div>}
            <Button onClick={() => setCurrentCards(allCards)}>All Cards</Button>
            {user && <Button onClick={handleToggleOwned}>Owned Cards Overlay</Button>}

            <Text>Filter by Set</Text>
            {sets.map((item) => (
                <Button key={item.set} onClick={(event) => handleChangeCards(event, 'set')}>
                    {item.name}
                </Button>
            ))}
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

            {currentCards.map((card) => (
                <Link key={card._id} to={`/cards/${card._id}`}>
                    <PokemonCard pokemon={card} />
                </Link>
            ))}
        </div>
    )
}