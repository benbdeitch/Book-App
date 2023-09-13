import { useContext } from "react"
import { UserContext } from "../contexts/UserProvider"


export default function SortingButton(){
    const {token} = useContext(UserContext)
    async function updatePriorities(){
        const request = {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: 
            }
        

    }


    return( <>
        <button onClick = {updatePriorities}>
            Add to Reading List?
        </button>
        
        </>)
}