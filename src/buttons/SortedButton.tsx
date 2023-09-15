import { useContext } from "react"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"


export default function SortingButton(){
    const URL = useContext(levelContext)
    const {token, readingList} = useContext(UserContext)
    async function updatePriorities(){
        const priorityChanges = readingList.map((entry:ReadingListEntry) => ( {"googleId": entry.book.googleId, "priority": entry.priority}))
        const request = {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "items": priorityChanges
                })
            }
        const response = await fetch(`${URL}api/update_priority`, request)
        
        if (response.ok){
            alert('Order Updated')
        }
    }


    return( <>
        <button onClick = {updatePriorities}>
            Update Order?
        </button>
        
        </>)
}