import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import RequestsList from "../components/RequestsList"
import { UserContext } from "../contexts/UserProvider"

import refreshFriendRequests from "../buttons/refresh_buttons/refreshFriendRequests"




export default function ActiveRequestsPage() {

    const {username, friendRequests} = useContext(UserContext)
    const [requestList, setRequestList] = useState(<Spinner/>)
    const refreshButton = refreshFriendRequests()
    useEffect( () => {

        setRequestList( <RequestsList />)
    }, [username, friendRequests])

    
            
       


    

    return (
        <>

        {refreshButton}
        {requestList}
  
    </>)
}