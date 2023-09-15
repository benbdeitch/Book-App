import { useContext } from "react"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"





export default function List_Add_Button({book}:BookProperty){
    const URL  = useContext(levelContext)
    const {token, readingList, setReadingList} = useContext(UserContext)
    async function addToReadingList() {
        
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "googleId": book.googleId

            })

        }
    
        const response = await fetch(`${URL}api/add-book-list`, request
        )

        if (response.ok){
            const data = await response.json();
            alert(data["Success"])
            let newList = readingList
            newList.unshift({"book": book, "priority": data["priority"]})
            setReadingList(newList)
            localStorage.setItem('readingList', JSON.stringify(newList))
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