import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"

import FriendButton from "../buttons/Friend_Button"
import { levelContext } from "../contexts/UrlProvider"



export default function AllFriendsPage(){
    const {friends, username} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const [friendData, setFriendData] = useState(<Spinner/>)

    const navigate = useNavigate()
    useEffect( () => {

        if (!username){navigate('/')}
        getFriendData()

    },[username])

    function toFriendProfile(friend:string){
        console.log(`${URL}history/${friend}`)
        navigate(`/history/${friend}`)
    }
    
    function getFriendData(){
        setFriendData(<>
            {Object.keys(friends).length ===0? <h5>Your friends list is empty!</h5>:
            Object.keys(friends).map((friend:string) => (
                <div onClick={()=> {toFriendProfile(friend)}} className = "Box" key={friend}>
                    <p>Username: {friend}</p>
                    <FriendButton string={friend}/>
                </div>))}</>)
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