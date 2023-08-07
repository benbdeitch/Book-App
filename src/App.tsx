//import { useState } from 'react'
import Navbars from "./components/NavbarType1"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {


  return (
    <>
    <BrowserRouter>
      <Navbars/>
      <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
