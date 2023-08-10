import  { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'




export default function  DisplayUser({userSearch}:encasedString){
    
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('In useEffect')
      if (!user.username) navigate('/')
      getUserData()
    }, [user])
    const [userData, setUserData] = useState(<Spinner />);
    
    
    async function getUserData() {
        let request ={
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        }
        const response = await fetch(`http://127.0.0.1:5000/api/user-profile/${userSearch}`, request)
        
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
        </>
    )







}