import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"

import FriendButton from "../buttons/Friend_Button"
import { levelContext } from "../contexts/UrlProvider"



export default function AllFriendsPage(){
    const {user} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const [friendData, setFriendData] = useState(<Spinner/>)

    const navigate = useNavigate()
    useEffect( () => {

        if (!user.username){navigate('/')}
        getFriendData()

    },[user])

    function toFriendProfile(friend:string){
        console.log(`${URL}history/${friend}`)
        navigate(`${URL}history/${friend}`)
    }
    
    function getFriendData(){
        setFriendData(<>
            {Object.keys(user.friends).length ===0? <h5>Your friends list is empty!</h5>:
            Object.keys(user.friends).map((friend:string) => (
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