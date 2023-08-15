import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import RequestsList from "../components/RequestsList"
import { UserContext } from "../contexts/UserProvider"




export default function ActiveRequestsPage() {
    const {user} = useContext(UserContext)
    const [requestList, setRequestList] = useState(<Spinner/>)
    useEffect( () => {

        loadRequests()
    }, [user])

    async function loadRequests(){
        let response = await fetch('http://127.0.0.1:5000/api/friend-requests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (response.ok){
            const data = await response.json()

            setRequestList(<>{data["requests"].length>0 
            ?<RequestsList array={data["requests"]}/>:
            <div className="Box"><h1>No Requests</h1></div>}</> )
        }


    }

    return (
        <>
        <div className="Box">
        <h1>Incoming Friend Requests</h1>
        </div>
        {requestList}
    </>)
}