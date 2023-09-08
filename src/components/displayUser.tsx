import  { useContext, useEffect, useState} from 'react'

import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import FriendButton from '../buttons/Friend_Button'
import { levelContext } from '../contexts/UrlProvider'




export default function  DisplayUser({string}:encasedString){
    const URL  = useContext(levelContext)
    const {friends, username, email, token } = useContext(UserContext)

    useEffect(() => {
        console.log(username)
      getUserData(string)
    }, [string])
    const [userData, setUserData] = useState(<Spinner />);
    
    let apiTarget = `${URL}api/user-profile/${string}`
    
    async function getUserData(string:string) {

        if (friends.hasOwnProperty(string)){
            setUserData(
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {friends[string].email }</h3></>)
        }
        else if(string = username){
            setUserData(
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {email }</h3></>)
        }
        else{
        let request ={
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const response = await fetch(apiTarget, request)
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUserData( <><h1>{data["username"]}'s Profile Page </h1><br />
            <h3>Email: {data["email"]}</h3></>)
        } else setUserData(<><h1>No User Found</h1></>);
    }
    }

    return (
        <>
       {userData}
       {username!= string? <FriendButton string={string}/> : <></>}
        </>
    )







}