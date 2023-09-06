import  { useContext, useEffect, useState} from 'react'

import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import FriendButton from '../buttons/Friend_Button'
import { levelContext } from '../contexts/UrlProvider'




export default function  DisplayUser({string}:encasedString){
    const URL  = useContext(levelContext)
    const {user} = useContext(UserContext)

    useEffect(() => {
        console.log('In useEffect')
      getUserData()
    }, [string])
    const [userData, setUserData] = useState(<Spinner />);
    
    let apiTarget = `${URL}api/user-profile/${string}`
    
    async function getUserData() {

        if (user.friends.hasOwnProperty(string)){
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {user.friends[string].email }</h3></>
        }
        else if(string = user.username){
            <><h1>{string}'s Profile Page </h1><br />
            <h3>Email: {user.email }</h3></>
        }
        else{
        let request ={
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
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
       {user.username!= string? <FriendButton string={string}/> : <></>}
        </>
    )







}