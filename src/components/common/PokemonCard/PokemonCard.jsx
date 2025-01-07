import { CardImage } from './PokemonCardStyles'

export default function PokemonCard({ pokemon }) {
    return (
        <CardImage src={pokemon.images} alt={pokemon.name} $isOwned={pokemon.isOwned} />
    )
}