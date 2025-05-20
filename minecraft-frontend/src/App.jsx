import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Footer from './components/Footer'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
