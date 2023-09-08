import { useContext, useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import refreshFriendList from "../buttons/refresh_buttons/refreshFriendList"
import FriendButton from "../buttons/Friend_Button"
import { levelContext } from "../contexts/UrlProvider"



export default function AllFriendsPage(){
    const {friends, username} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const [friendData, setFriendData] = useState(<Spinner/>)
    const refreshButton = refreshFriendList()
    const navigate = useNavigate()
    useEffect( () => {

        if (!username){navigate('/')}
        getFriendData()

    },[username, friends])

    function toFriendProfile(friend:string){
        console.log(`${URL}history/${friend}`)
        navigate(`/user-profile/${friend}`)
    }
    
    function getFriendData(){
        setFriendData(<>
            {Object.keys(friends).length ===0? <h5>Your friends list is empty!</h5>:
            Object.keys(friends).map((friend:string) => (
                <div onClick={()=> {toFriendProfile(friend)}} className = "Box" key={friend}>
                    <p>Username: {friend}</p>
                    <FriendButton item = {{'string': friend, 'number': 3}}/>
                </div>))}</>)
    }
    
    return(
        <>
        <div className="Box">
            <h1> Friends List</h1>
        </div>
        {refreshButton}
        <div className="Box">
            {friendData}
        </div>
    </>
    )



}