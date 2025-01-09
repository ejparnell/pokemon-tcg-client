import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from '../components/Home/Home'
import SignUp from '../components/auth/SignUp/SignUp'
import SignIn from '../components/auth/SignIn/SignIn'
import { UserProvider } from '../contexts/UserProvider'
import Nav from '../components/Nav/Nav'
import ProfileHome from '../components/Profile/ProfileHome/ProfileHome'
import PokemonDetail from '../components/PokemonDetail/PokemonDetail'
import BoosterPackDetail from '../components/BoosterPacks/BoosterPackDetail/BoosterPackDetail'
import BoosterPacksHome from '../components/BoosterPacks/BoosterPacksHome/BoosterPacksHome'
import DecksHome from '../components/Decks/DecksHome/DecksHome'
import DeckCreate from '../components/Decks/DeckCreate/DeckCreate'
import DeckShow from '../components/Decks/DeckShow/DeckShow'
import DeckEdit from '../components/Decks/DeckEdit/DeckEdit'

function App() {

  return (
    <UserProvider>
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
        <Route path='/trades' element={<div>Trades</div>} />
        <Route path='/battle' element={<div>Battle</div>} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      <Nav/>
    </UserProvider>
  )
}

export default App
