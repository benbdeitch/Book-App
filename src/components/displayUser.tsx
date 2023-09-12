import  { useContext, useEffect, useState} from 'react'

import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import FriendButton from '../buttons/Friend_Button'
import { levelContext } from '../contexts/UrlProvider'
import { useNavigate } from 'react-router-dom'




export default function  DisplayUser({string}:encasedString){
    const URL  = useContext(levelContext)
    const {friends, username, email, token, friendRequests } = useContext(UserContext)

    const navigate = useNavigate()
    let number:number = 0;
    useEffect(() => {
        number= 0;
        console.log("string: " + string)
      getUserData(string, number)
    }, [username])
    const [userData, setUserData] = useState(<Spinner />);
    const [historyEnabled, setHistoryData] = useState(<Spinner />)
    let apiTarget = `${URL}api/user-profile/${string}`
    
    async function getUserData(string:string, number:number) {
        console.log("API target: " + apiTarget)
        if (friends.hasOwnProperty(string)){
            number = 3;
            setUserData(
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {friends[string].email }</h3>
            {<FriendButton item={{'string':string, 'number':number}}/>}</>)
            setHistoryData(<button onClick={toHistoryPage}>To {string}'s History</button>)
        }
        else if(string == username){
            number = 5 
            setUserData(
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {email }</h3>
            { <FriendButton item={{'string':string, 'number':number}}/>}</>)
            setHistoryData(<button onClick={toHistoryPage}>To {string}'s History</button>)
        }
        else{
        console.log('Request sent')
        let request ={
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await fetch(apiTarget, request)
        
        if (response.ok) {
            number =2
            for (let  i of friendRequests["out"]){
                if (i.to == string){ number = 1; break;}
            }
            for (let i of friendRequests["in"]){
                if (i.from == string) { number =4; break; }
            }
      
            const data = await response.json();
            console.log(data);
            setUserData( <><h1>{data["username"]}'s Profile Page </h1><br />
            <h3>Email: {data["email"]}</h3>
            {<FriendButton item={{'string':string, 'number':number}}/>}</>)
            setHistoryData(<p> {string}'s history is hidden, as they are not on your friends list.</p>)
        } else setUserData(<><h1>No User Found</h1></>);
    }
    }
    function toHistoryPage(){
        navigate(`/history/${string}`)
    }
    return (
        <>
        <div className="Box">
            {userData}
        </div>
        <div className="Box">
            {historyEnabled}
        </div>
        </>
    )







}