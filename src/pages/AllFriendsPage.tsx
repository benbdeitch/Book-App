import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import Friend_Button from "../buttons/Friend_Button"
import FriendButton from "../buttons/Friend_Button"



export default function AllFriendsPage(){
    const {user} = useContext(UserContext)
    const [friendData, setFriendData] = useState(<Spinner/>)
    const navigate = useNavigate()
    useEffect( () => {

        if (!user.username){navigate('/')}
        getFriendData()

    },[user])

    async function getFriendData(){
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        }

        const response = await fetch('http://127.0.0.1:5000/api/all-friends', request)

        if (response.ok){
            const data = await response.json()
            console.log(data)
            setFriendData(<>
            {data["friends"] && data["friends"].length > 0 && 
            data["friends"].map((friend:UserData) => (
                <div className = "Box">
                    <p>Username: {friend.username}</p>
                    <FriendButton string={friend.username}/>
                </div>

            ))}
            </>)
        }
    }

    
    return(
        <>
        <div className="Box">
            <h1> Friends List</h1>
        </div>
        <div className="Box">
            {friendData}
        </div>
    </>
    )



}