import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserProvider'
import { fetchCards } from '../../../utils/cardServices'
import { createTrade } from '../../../utils/tradeServices'

import H1 from '../../common/H1/H1'
import PokemonCard from '../../common/PokemonCard/PokemonCard'
import Button from '../../common/Button/Button'
import Text from '../../common/Text/Text'
import Drawer from '../../common/Drawer/Drawer'

export default function TradeCreate() {
    const { user } = useContext(UserContext)
    const navagate = useNavigate()
    const [ownedCards, setOwnedCards] = useState([])
    const [showOwnedCards, setShowOwnedCards] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [showAllCards, setShowAllCards] = useState(false)
    const [trade, setTrade] = useState({
        card: {},
        willTradeFor: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getAllCards() {
            setLoading(true)
            setError(null)

            try {
                const { cards } = await fetchCards()
                setAllCards(cards)
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

    async function handleCreateTrade() {
        try {
            await createTrade(trade)
            setTrade({ card: {}, willTradeFor: [] })
            navagate('/trades')
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Trade Create</H1>
            <Drawer>
                <H1>Trade Card</H1>

                <Button onClick={() => setTrade({ card: {}, willTradeFor: [] })}>Clear Trade</Button>
                <Button onClick={handleCreateTrade}>Create Trade</Button>

                {trade.card._id ? <>
                    <PokemonCard pokemon={trade.card} />
                    <Button onClick={() => setTrade(prev => ({ ...prev, card: {} }))}>Clear Trade Card</Button>
                </> : <Text>Select a card to trade</Text>}
                <Text>Will Trade For:</Text>
                
                {trade.willTradeFor.length ? trade.willTradeFor.map((card) => (
                    <div key={card._id} onClick={() => setTrade(prev => ({ ...prev, willTradeFor: prev.willTradeFor.filter((c) => c._id !== card._id) }))}>
                        <PokemonCard pokemon={card} />
                    </div>
                )) : <Text>Select cards to trade for</Text>}
            </Drawer>

            <Button onClick={() => setShowOwnedCards(prev => !prev)}>Show Owned Cards</Button>
            <Button onClick={() => setShowAllCards(prev => !prev)}>Show All Cards</Button>

            {showOwnedCards && (<>
                <Text>Owned Cards</Text>
                {ownedCards.map((card) => (
                    <div key={card.id} onClick={() => setTrade(prev => ({ ...prev, card }))}>
                        <PokemonCard pokemon={card} />
                    </div>
                ))}
            </>)}

            {showAllCards && (<>
                <Text>All Cards</Text>
                {allCards.map((card) => (
                    <div key={card.id} onClick={() => setTrade(prev => ({ ...prev, willTradeFor: [...prev.willTradeFor, card] }))}>
                        <PokemonCard pokemon={card} />
                    </div>
                ))}
            </>)}
        </div>
    )
}