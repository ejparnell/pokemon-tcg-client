import { CardImage } from './PokemonCardStyles'

export default function PokemonCard({ pokemon  }) {
    if (!pokemon.hasOwnProperty('isOwned')) pokemon.isOwned = true
    return (
        <CardImage src={pokemon.images} alt={pokemon.name} $isOwned={pokemon.isOwned} />
    )
}