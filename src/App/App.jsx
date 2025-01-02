import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from '../components/Home/Home'
import SignUp from '../components/auth/SignUp/SignUp'
import SignIn from '../components/auth/SignIn/SignIn'
import { UserProvider } from '../contexts/UserProvider'

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </UserProvider>
  )
}

export default App
