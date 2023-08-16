import { useContext } from "react"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"





export default function List_Add_Button({string}:encasedString){
    const URL  = useContext(levelContext)
    const {user} = useContext(UserContext)
    async function addToReadingList() {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({
                "googleId": string

            })

        }
    
        const response = await fetch(`${URL}api/add-book-list`, request
        )

        if (response.ok){
            alert('')
            const data = await response.json();
            alert(data["Success"])
        }
        else{
            const data = await response.json();
            alert(data["Error"])
        }
    }
    return(
        <>
        <button onClick = {addToReadingList}>
            Add to Reading List?
        </button>
        
        </>
    )




}