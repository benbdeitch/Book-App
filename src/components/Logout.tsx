import { useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import Spinner from "react-bootstrap/esm/Spinner"
import logout from "../static/helper_functions/logout"
import { UserContext } from "../contexts/UserProvider"

export default function Logout() {
  const context = useContext(UserContext)
  console.log('In Logout')

  
  const navigate = useNavigate()
  
  useEffect(()=>{
    logout(context)
    navigate('/')
  })

  return (
    <Spinner animation="border" variant="info" />
  )
}
