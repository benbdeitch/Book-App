


import Box from "../components/Box"
import DisplayUser from "../components/displayUser"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { useContext } from "react"



export default function UserProfile(){
    const {user} =useContext(UserContext)
    const navigate = useNavigate()
    let{string} = useParams()
    console.log(string)
    if (!string){
        string = user.username
    }

    function toHistoryPage(){
        navigate(`/history/${string}`)
    }
    return (
        <>
        <Box>
        <DisplayUser string= {string}/>
        </Box>
        <button onClick={toHistoryPage}>To {string}'s History</button>
        </>
    )    
}