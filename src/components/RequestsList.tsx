import FriendButton from "../buttons/Friend_Button";



export default function RequestsList({string}:encasedString){


    return(
        <>
          
            <div className="Box">
                <h5>From: {string}</h5>
                <FriendButton  string={string}/>
            </div>
    
            </>)

}