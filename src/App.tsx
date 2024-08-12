import {Route, Routes } from 'react-router-dom'
import './styles/App.scss'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Account from './pages/Account'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'

function App() {

  return (
    <>
      <Navbar />

        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/shop" index element={<Shop/>}/>
          <Route path="/account" index element={<Account/>}/>
          <Route path="/checkout" index element={<Checkout/>}/>
          <Route path="/about" index element={<About/>}/>
          <Route path="/admin" index element={<Admin/>}/>
        </Routes>
    </>
  )
}

export default App
