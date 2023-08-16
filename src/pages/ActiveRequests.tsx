import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import RequestsList from "../components/RequestsList"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"




export default function ActiveRequestsPage() {
    const URL  = useContext(levelContext)
    const {user} = useContext(UserContext)
    const [requestList, setRequestList] = useState(<Spinner/>)
    useEffect( () => {

        loadRequests()
    }, [user])

    async function loadRequests(){
        let response = await fetch(`${URL}api/friend-requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (response.ok){
            const data = await response.json()
            console.log(data)
            let array = data["requests"]
            setRequestList(<>{array.length>0 
            && array.map((item:string)=> { return <RequestsList string={item}/>})}
            </> )
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