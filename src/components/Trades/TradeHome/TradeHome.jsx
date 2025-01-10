import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { fetchTrades } from '../../../utils/tradeServices'

import H1 from '../../common/H1/H1'
import Text from '../../common/Text/Text'
import Button from '../../common/Button/Button'
import PokemonCard from '../../common/PokemonCard/PokemonCard'

export default function TradeHome() {
    const [yourTrades, setYourTrades] = useState([])
    const [showYourTrades, setShowYourTrades] = useState(false)
    const [trades, setTrades] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getYourTrades() {
            setLoading(true)
            setError(null)

            try {
                const data = await fetchTrades()
                setYourTrades(data.yourTrades)
                setTrades(data.trades)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getYourTrades()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <H1>Trade Home</H1>
            <Link to="/trades/create"><Text>New Trade</Text></Link>
            <Button onClick={() => setShowYourTrades(prev => !prev)}>{showYourTrades ? 'Hide Your Trades' : 'Show Your Trades'}</Button>
            {showYourTrades && <>
                <Text>Your Trades</Text>
                {yourTrades.map((trade) => (
                    <div key={trade._id}>
                        <Text>Trade Cards</Text>
                        <Link to={`/trades/${trade._id}`}>Trade Details</Link>
                        <PokemonCard pokemon={trade.card} />

                        <Text>Will Trade For</Text>
                        {trade.willTradeFor.map((card) => (
                            <PokemonCard key={card._id} pokemon={card} />
                        ))}
                    </div>
                ))}
            </>}

            <Text>All Trades</Text>
            {trades.map((trade) => (
                <div key={trade._id}>
                    <Text>Trader: {trade.profile.username}</Text>
                    <Link to={`/trades/${trade._id}`}>Trade Details</Link>
                    <Text>Trade Cards</Text>
                    <PokemonCard pokemon={trade.card} />

                    <Text>Will Trade For</Text>
                    {trade.willTradeFor.map((card) => (
                        <PokemonCard key={card._id} pokemon={card} />
                    ))}
                </div>
            ))}
        </div>
    )
}