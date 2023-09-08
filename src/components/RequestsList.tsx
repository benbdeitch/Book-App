import { useContext } from "react";
import FriendButton from "../buttons/Friend_Button";
import { UserContext } from "../contexts/UserProvider";


export default function RequestsList(){
    let {friendRequests} = useContext(UserContext)

    return(
        <>
        {friendRequests.length == 0? 
        <div className="Box">
            <p> You have no incoming friend requests.</p>
        </div>: <></>}
          {friendRequests.length>0 && friendRequests.map((request:FriendRequest) =>

            <div className="Box">
                <h5>From: {request.from}</h5>
                <p> Date: {request.date}</p>
                <FriendButton  string={request.from}/>
            </div>)}
    
            </>)

}