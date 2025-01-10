import { Routes, Route } from 'react-router-dom'

import { UserProvider } from '../contexts/UserProvider'

import { AppMainContainer } from './AppStyles'
import Home from '../components/Home/Home'
import SignUp from '../components/auth/SignUp/SignUp'
import SignIn from '../components/auth/SignIn/SignIn'
import Nav from '../components/Nav/Nav'
import ProfileHome from '../components/Profile/ProfileHome/ProfileHome'
import PokemonDetail from '../components/PokemonDetail/PokemonDetail'
import BoosterPackDetail from '../components/BoosterPacks/BoosterPackDetail/BoosterPackDetail'
import BoosterPacksHome from '../components/BoosterPacks/BoosterPacksHome/BoosterPacksHome'
import DecksHome from '../components/Decks/DecksHome/DecksHome'
import DeckCreate from '../components/Decks/DeckCreate/DeckCreate'
import DeckShow from '../components/Decks/DeckShow/DeckShow'
import DeckEdit from '../components/Decks/DeckEdit/DeckEdit'
import TradeHome from '../components/Trades/TradeHome/TradeHome'
import TradeCreate from '../components/Trades/TradeCreate/TradeCreate'
import TradeShow from '../components/Trades/TradeShow/TradeShow'
import TradeEdit from '../components/Trades/TradeEdit/TradeEdit'

function App() {

  return (
    <UserProvider>
      <AppMainContainer>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<ProfileHome />} />
          <Route path='/cards/:id' element={<PokemonDetail />} />
          <Route path='/booster-packs/:set' element={<BoosterPackDetail />} />
          <Route path='/booster-packs' element={<BoosterPacksHome />} />
          <Route path='/decks' element={<DecksHome />} />
          <Route path='/decks/create' element={<DeckCreate />} />
          <Route path='/decks/:id' element={<DeckShow />} />
          <Route path='/decks/:id/edit' element={<DeckEdit />} />
          <Route path='/trades' element={<TradeHome />} />
          <Route path='/trades/create' element={<TradeCreate />} />
          <Route path='/trades/:id' element={<TradeShow />} />
          <Route path='/trades/:id/edit' element={<TradeEdit />} />
          <Route path='/battle' element={<div>Battle</div>} />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </AppMainContainer>
      <Nav />
    </UserProvider>
  )
}

export default App
