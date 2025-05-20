import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Footer from './components/Footer'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
