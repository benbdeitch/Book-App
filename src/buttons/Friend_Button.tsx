import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { Spinner } from "react-bootstrap"




export default function FriendButton({string}:encasedString){
    let response
  
    const buttonOptions:JSX.Element[] = [<Spinner/>, 
                                <button className="disabledFriendButton">Friend Request Sent</button>,
                                <button className="sendFriendRequest" onClick ={makeRequest}>Send Friend Request?</button>,
                                <button className = "removeFriend" onClick={removeFriend}>Remove Friend</button>, 
                                <>
                                <button className="acceptButton" onClick={acceptRequest}>Accept Friend Request</button>
                                <button className="declineButton" onClick={declineRequest}>Decline Friend Request</button>
                                </>]
    const [buttonState, setButtonState] = useState(buttonOptions[0])
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        checkFriendship()
       
    }, [user] )
        async function makeRequest(){
            response = await fetch(`http://127.0.0.1:5000/api/make-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been sent to ${string}`)
                setButtonState(buttonOptions[1])
            }
        }
        async function removeFriend(){
            response = await fetch(`http://127.0.0.1:5000/api/remove-friend`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend ${string} has been removed.`)
                setButtonState(buttonOptions[2])
            }
        }

        async function acceptRequest(){
            response = await fetch(`http://127.0.0.1:5000/api/accept-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been accepted. You and ${string} are now friends.`)
                setButtonState(buttonOptions[3])
            }
        }
        async function declineRequest(){
            response = await fetch(`http://127.0.0.1:5000/api/decline-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been declined.`)
                setButtonState(buttonOptions[2])
            }
        }
        async function checkFriendship(){
             response = await fetch(`http://127.0.0.1:5000/api/isfriend/${string}`,{
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if (response.ok){
                const data = await response.json()
                console.log(data)
                if (data["status"]=="friend")
                    setButtonState(buttonOptions[3])
                if (data["status"] == "requestMade")
                    setButtonState(buttonOptions[1])
                if (data["status"] == "madeRequest")
                    setButtonState(buttonOptions[4])
                if (data["status"]== "none")
                    setButtonState(buttonOptions[2])
            }
        }
         

        return(
            <>
                {buttonState}
                </>        
        )










}