import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserProvider'
import { fetchTrade, tradeCard } from '../../../utils/tradeServices'

import H1 from '../../common/H1/H1'
import Text from '../../common/Text/Text'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'

export default function TradeShow() {
    const { user, setUser } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [trade, setTrade] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getTrade() {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchTrade(id)
                if (user && data) {
                    const ownedCardsIds = user.profile.cards.map((card) => card._id)
                    const markedCards = data.trade.willTradeFor.map((card) => {
                        if (ownedCardsIds.includes(card._id)) {
                            card.isOwned = true
                        }
                        return card
                    })
                    data.trade.willTradeFor = markedCards
                    setTrade(data.trade)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getTrade()

        
    }, [])

    async function handleTrade(card) {
        try {
            const data = await tradeCard(id, card)
            console.log('Trade successful', data)
            setUser((prev) => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    cards: data.cards
                }
            }))
            navigate('/trades')
        } catch (error) {
            console.log('Trade failed', error)
            setError(error.message)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Trade Show</H1>
            <Text>Trade Card</Text>
            <PokemonCard pokemon={trade.card} />

            <Text>Will Trade For</Text>
            {trade.willTradeFor.map((card) => (
                <>
                    <PokemonCard key={card._id} pokemon={card} />
                    <Button onClick={() => handleTrade(card)}>Trade</Button>
                </>
            ))}
        </div>
    )
}