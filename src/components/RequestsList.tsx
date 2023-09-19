import { useContext } from "react";
import FriendButton from "../buttons/Friend_Button";
import { UserContext } from "../contexts/UserProvider";


export default function RequestsList(){
    let {friendRequests} = useContext(UserContext)

    return(
        <><div className="Box">
        <h1> Incoming Friend Requests</h1>
        <hr/>
        {friendRequests.in.length == 0? 
     
            <p> You have no incoming friend requests.</p>
       : <></>}
       
          {friendRequests.in.length>0 && friendRequests.in.map((request:IncFriendRequest) =>
               (<div key={"from" + request.from}>
                <h5>From: {request.from}</h5>
                <p> Date: {request.date}</p>
                <FriendButton  item={{'string': request.from, 'number': 4}}/></div>))
           }
           </div>
           <div className="Box">
            <h1> Outgoing Friend Requests</h1>
            <hr/>
            {friendRequests.out.length == 0? 
        
            <p> You have no outgoing friend requests.</p>
        : <></>}
        {friendRequests.out.length>0 && friendRequests.out.map((request:OutFriendRequest) =>

           <div key={"to" + request.to}>
                <h5>To: {request.to}</h5>
                <p> Date: {request.date}</p>
            </div>)}
            </div>
            </>)

}