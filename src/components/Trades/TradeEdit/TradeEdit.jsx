import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { UserContext } from '../../../contexts/UserProvider'
import { fetchTrade } from '../../../utils/tradeServices'

import H1 from '../../common/H1/H1'
import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'
import Drawer from '../../common/Drawer/Drawer'

export default function TradeEdit() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [ownedCards, setOwnedCards] = useState([])
    const [showOwnedCards, setShowOwnedCards] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [showAllCards, setShowAllCards] = useState(false)
    const [trade, setTrade] = useState({
        card: {},
        willTradeFor: []
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getTrade() {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchTrade(id)
                setTrade(data.trade)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getTrade()

        if (user) {
            setOwnedCards(user.profile.cards)
        }
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Edit Trade</H1>
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