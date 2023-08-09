//import { useState } from 'react'
import Navbars from "./components/NavbarType1"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from "./components/Footer";
import FormPage from "./pages/FormPage";
import UserProfile from "./pages/UserProfile";
function App() {


  return (
    <>
    <BrowserRouter>
      <Navbars/>
      <Routes>
      <Route path='/login' element= {<FormPage />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/user-profile' element={<UserProfile />} />
      <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
