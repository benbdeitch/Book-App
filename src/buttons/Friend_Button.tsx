import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { Spinner } from "react-bootstrap"
import { levelContext } from "../contexts/UrlProvider"




export default function FriendButton({item}:encasedItem){
    let response
    let string = item['string']
    let number = item['number']
    const URL  = useContext(levelContext)
    const buttonOptions:JSX.Element[] = [<Spinner/>, 
                                <button className="disabledFriendButton">Friend Request Sent</button>,
                                <button className="sendFriendRequest" onClick ={makeRequest}>Send Friend Request?</button>,
                                <button className = "removeFriend" onClick={removeFriend}>Remove Friend</button>, 
                                <>
                                <button className="acceptButton" onClick={acceptRequest}>Accept Friend Request</button>
                                <button className="declineButton" onClick={declineRequest}>Decline Friend Request</button>
                                </>, <></>]
    const [buttonState, setButtonState] = useState(buttonOptions[number])
    console.log(number)
    const {username, token} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!username)(navigate('/'))

       
    }, [username] )
        async function makeRequest(){
            response = await fetch(`${URL}api/make-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been sent to ${string}`)
                setButtonState(buttonOptions[1])
            }
        }
        async function removeFriend(){
            response = await fetch(`${URL}api/remove-friend`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend ${string} has been removed.`)
                setButtonState(buttonOptions[2])
            }
        }

        async function acceptRequest(){
            response = await fetch(`${URL}api/accept-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been accepted. You and ${string} are now friends.`)
                setButtonState(buttonOptions[3])
            }
        }
        async function declineRequest(){
            response = await fetch(`${URL}api/decline-request`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({"username": string})
            })
            if (response.ok){
                alert(`Friend request has been declined.`)
                setButtonState(buttonOptions[2])
            }
        }
       
         

        return(
            <>
                {buttonState}
                </>        
        )










}