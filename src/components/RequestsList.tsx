import { useContext } from "react";
import FriendButton from "../buttons/Friend_Button";
import { UserContext } from "../contexts/UserProvider";


export default function RequestsList(){
    let {user} = useContext(UserContext)

    return(
        <>
        {user.friendRequests.length == 0? 
        <div className="Box">
            <p> You have no incoming friend requests.</p>
        </div>: <></>}
          {user.friendRequests.length>0 && user.friendRequests.map((request:FriendRequest) =>

            <div className="Box">
                <h5>From: {request.from}</h5>
                <p> Date: {request.date}</p>
                <FriendButton  string={request.from}/>
            </div>)}
    
            </>)

}