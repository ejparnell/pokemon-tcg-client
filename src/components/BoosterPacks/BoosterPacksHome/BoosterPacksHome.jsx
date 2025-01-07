import { Link } from 'react-router-dom'

import { BOOSTER_PACKS } from './BoosterPacksConstants'

import H1 from '../../common/H1/H1'
import Text from '../../common/Text/Text'

export default function BoosterPacksHome() {
    return (
        <div>
            <H1>Booster Packs</H1>
            {BOOSTER_PACKS.map((boosterPack, index) => (
                <Link to={`/booster-packs/${boosterPack.set}`} key={index}>
                    <Text>{boosterPack.name}</Text>
                </Link>
            ))}
        </div>
    )
}