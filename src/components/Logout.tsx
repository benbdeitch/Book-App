import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Logout() {

  console.log('In Logout')

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    setUser({
      username:'',
      token:'',
      email:'',
      friends:{},
      recommendations:[],
      readingList:[],
      readingHistory:[],
      friendRequests:[]

    })
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem('email')
    localStorage.removeItem('friends')
    localStorage.removeItem('friendRequests')
    localStorage.removeItem('readingList')
    localStorage.removeItem('readingHistory')
    localStorage.removeItem('recommendations')
    navigate('/')
  })

  return (
    <Spinner animation="border" variant="info" />
  )
}
