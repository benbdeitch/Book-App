


import Box from "../components/Box"
import DisplayUser from "../components/displayUser"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { useContext } from "react"



export default function UserProfile(){
    const {user} =useContext(UserContext)
    let{string} = useParams()
    console.log(string)
    if (!string){
        string = user.username
    }

    return (
        <>
        <Box>
        <DisplayUser string= {string}/>
        </Box>
        </>
    )    
}