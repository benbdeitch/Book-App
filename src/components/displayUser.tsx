import  { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import FriendButton from '../buttons/Friend_Button'




export default function  DisplayUser({string}:encasedString){
    
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('In useEffect')
      getUserData()
    }, [string])
    const [userData, setUserData] = useState(<Spinner />);
    
    let apiTarget = `http://127.0.0.1:5000/api/user-profile/${string}`
    
    async function getUserData() {
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

    return (
        <>
       {userData}
       {user.username!= string? <FriendButton string={string}/> : <></>}
        </>
    )







}