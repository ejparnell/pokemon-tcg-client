import { useState, useEffect, useContext } from 'react'

import { fetchBoosterPack } from '../../../utils/cardServices'
import { UserContext } from '../../../contexts/UserProvider'

import PokemonCard from '../../common/PokemonCard/PokemonCard'
import H1 from '../../common/H1/H1'
import Button from '../../common/Button/Button'

export default function BoosterPackBuy({ set, setBuyBoosterPack }) {
    const { setUser } = useContext(UserContext)
    const [boosterPack, setBoosterPack] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getBoosterPack() {
            setError(null)
            try {
                const data = await fetchBoosterPack(set)
                setBoosterPack(data.boosterPack)
                setUser((prev) => ({
                    ...prev,
                    profile: {
                        ...prev.profile,
                        money: prev.profile.money - data.cost,
                        cards: [...prev.profile.cards, ...data.boosterPack]
                    }
                }))
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getBoosterPack()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {error && <div>{Object.values(error)}</div>}
            <H1>Booster Pack Detail: {set}</H1>
            {boosterPack.map((card) => (
                <PokemonCard key={card._id} pokemon={card} />
            ))}
            <Button onClick={() => setBuyBoosterPack(false)}>Close</Button>
        </div>
    )
}