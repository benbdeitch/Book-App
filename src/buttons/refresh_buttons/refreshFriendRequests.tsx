import { useContext } from "react"
import { UserContext } from "../../contexts/UserProvider"
import { levelContext } from "../../contexts/UrlProvider"


export default function refreshFriendRequests(){

const URL = useContext(levelContext)
const {token, setFriendRequests} = useContext(UserContext)
    async function getFriendRequests(){
        console.log("hi")
        let response = await fetch(`${URL}api/friend-requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.ok){
            const data = await response.json()
            console.log(data)
            setFriendRequests(data["requests"])
            localStorage.setItem('friendRequests', JSON.stringify(data["requests"]))
        }
    }


    return (
        <>

        <button onClick={getFriendRequests} className = "refreshButton">Refresh Requests</button>
        </>
    )
}