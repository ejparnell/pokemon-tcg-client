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
        <Route path='/decks' element={<div>Decks</div>} />
        <Route path='/trades' element={<div>Trades</div>} />
        <Route path='/battle' element={<div>Battle</div>} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      <Nav/>
    </UserProvider>
  )
}

export default App
