import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { fetchFullSet } from '../../../utils/cardServices'

import PokemonCard from '../../common/PokemonCard/PokemonCard'
import H1 from '../../common/H1/H1'
import Text from '../../common/Text/Text'
import Button from '../../common/Button/Button'
import BoosterPackBuy from '../BoosterPackBuy/BoosterPackBuy'

export default function BoosterPackDetail() {
    const { set } = useParams()
    const [fullSet, setFullSet] = useState(null)
    const [pokemon, setPokemon] = useState([])
    const [trainers, setTrainers] = useState([])
    const [energy, setEnergy] = useState([])
    const [buyBoosterPack, setBuyBoosterPack] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getFullSet() {
            setError(null)
            try {
                const data = await fetchFullSet(set)
                setFullSet(data.fullSet)
                data.fullSet.forEach((card) => {
                    if (card.supertype === 'Pokémon') {
                        setPokemon((prev) => [...prev, card])
                    }
                    if (card.supertype === 'Trainer') {
                        setTrainers((prev) => [...prev, card])
                    }
                    if (card.supertype === 'Energy') {
                        setEnergy((prev) => [...prev, card])
                    }
                })
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getFullSet()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {error && <div>{Object.values(error)}</div>}
            <H1>Booster Pack Detail: {set}</H1>
            <Text>Number of cards in set: {fullSet.length}</Text>
            <Button onClick={() => setBuyBoosterPack(true)}>Buy a {set}</Button>
            {fullSet && !buyBoosterPack && <>
                <Text>Pokemon: </Text>
                {pokemon.map((card) => (
                    <PokemonCard key={card._id} pokemon={card} />
                ))}
                <Text>Trainers: </Text>
                {trainers.map((card) => (
                    <PokemonCard key={card._id} pokemon={card} />
                ))}
                <Text>Energy: </Text>
                {energy.map((card) => (
                    <PokemonCard key={card._id} pokemon={card} />
                ))}
            </>}
            {buyBoosterPack && <>
                <BoosterPackBuy set={set} setBuyBoosterPack={setBuyBoosterPack} />
            </>}
        </div>
    )
}