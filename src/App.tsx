//import { useState } from 'react'
import Navbars from "./components/NavbarType1"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Footer from "./components/Footer";
import FormPage from "./pages/FormPage";
import UserProfile from "./pages/UserProfile";
import Logout from "./components/Logout";
import { UserContext } from "./contexts/UserProvider";
import { useContext, useEffect } from "react";
import ListPage from "./pages/ListPage";
import BookSearchResultsPage from "./pages/BookSearchResultsPage";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import BookPage from "./pages/BookPage";
import BookHistoryPage from "./pages/BookHistoryPage";
import AllFriendsPage from "./pages/AllFriendsPage";
import ActiveRequestsPage from "./pages/ActiveRequests";
import RecommendationsPage from "./pages/RecommendationsPage";

function App() {

      const {setUsername, token, setToken, setEmail,  setReadingList, setRecommendations, setFriends,  setReadingHistory, setFriendRequests} = useContext(UserContext)
      let testToken:string|null = localStorage.getItem('token')
      let testUser:string|null = localStorage.getItem('username')
      let testEmail:string|null=  localStorage.getItem('email')
      let testRec:string|null = localStorage.getItem('recommendations')
      let testFriends:string|null = localStorage.getItem('friends')
      let testFriendReq:string|null = localStorage.getItem('friendRequests')
      let testList:string|null = localStorage.getItem('readingList')
      let testHistory:string|null = localStorage.getItem('readingHistory')
      useEffect(() =>{
        if (!token && testToken && testUser){
          //Verifying data in the local storage
            setUsername(JSON.parse(testUser ?? "")),
            setToken(JSON.parse(testToken?? "")),
            setEmail(JSON.parse(testEmail)?? ""),
            testRec? setRecommendations(JSON.parse(testRec)): [],
            testFriends? setFriends(JSON.parse(testFriends)): {},
            testFriendReq? setFriendRequests(JSON.parse(testFriendReq)): [],
            testList? setReadingList(JSON.parse(testList)): [],
            testHistory? setReadingHistory(JSON.parse(testHistory)):[]
           }

          
        }
        
      )
  return (
    <>
    <div className ="mainSection">
    <BrowserRouter>
      <Navbars/>
      <Routes>
      <Route path='/login' element= {<FormPage form={<LoginForm/>} />} />
      <Route path='/' element={<MainPage />} />
      <Route path = '/register' element ={<RegisterForm/>} />
      <Route path='/user-profile/:string' element={<UserProfile/> }/>
      <Route path='/logout' element={<Logout/>} />
      <Route path='/show-list' element={<ListPage/>} />
      <Route path = '/history/:username' element = {<BookHistoryPage/>}/>
      <Route path='/book/:string' element={<BookPage/>}/>
      <Route path= '/friends' element = {<AllFriendsPage/>}/>
      <Route path= '/friends/friend-requests' element={<ActiveRequestsPage/>}/>
      <Route path= '/book-search' element= {<BookSearchResultsPage/>} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route path='/recommendations' element={<RecommendationsPage/>}/>
      </Routes>
      
      
      </BrowserRouter>
      </div>
      <Footer/>
    </>
  )
}

export default App
