//import { useState } from 'react'
import Navbars from "./components/NavbarType1"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Footer from "./components/Footer";
import FormPage from "./pages/FormPage";
import UserProfile from "./pages/UserProfile";
import Logout from "./components/Logout";
import { UserContext } from "./contexts/UserProvider";
import { useContext, useEffect } from "react";
import ListPage from "./pages/ListPage";
import BookSearchResultsPage from "./pages/BookSearchResultsPage";
import LoginForm from "./forms/LoginForm";

function App() {

      const {user, setUser} = useContext(UserContext)
      let testToken:string|null = localStorage.getItem('token')
      let testUser:string|null = localStorage.getItem('username')
      let userForUrl:string = ""
      if (testUser!==null){
         userForUrl = JSON.parse(testUser);
      }
      console.log(userForUrl)
      useEffect(() =>{
        if (!user.token && testToken && testUser){
          setUser({
            username: JSON.parse(testUser),
            token: JSON.parse(testToken)
          })
        }
        
      })
  return (
    <>
    <BrowserRouter>
      <Navbars/>
      <Routes>
      <Route path='/login' element= {<FormPage form={<LoginForm/>} />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/user-profile/:string' element={<UserProfile/> }/>
      <Route path='/logout' element={<Logout/>} />
      <Route path='/show-list' element={<ListPage/>} />
      <Route path= '/book-search' element= {<BookSearchResultsPage/>} />
      <Route path='*' element={<Navigate to='/' />} />

      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
