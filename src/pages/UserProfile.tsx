


import DisplayUser from "../components/displayUser"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { useContext } from "react"



export default function UserProfile(){
    const {username} =useContext(UserContext)

    let{string} = useParams()
    console.log(string)
    if (!string){
        string = username
    }


    return (
        <>
       
        <DisplayUser string= {string}/>
     
       
        </>
    )    
}