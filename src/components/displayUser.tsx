import  { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'




export default function  DisplayUser(){

    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('In useEffect')
      if (!user.username) navigate('/')
    }, [user])
    const [userData, setUserData] = useState(["Hello", ""]);
    
    getUserData()
    async function getUserData() {
        
        const response = await fetch('http://127.0.0.1:5000/api/user-profile', {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        },
           
        }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUserData([data["user"]["username"], data["user"]["email"]])
        } else window.alert('Invalid UserData');
        
    }

    return (
        <>
        <h1> {userData[0]} {userData[1]}</h1>
        </>
    )







}