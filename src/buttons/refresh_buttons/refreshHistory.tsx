import { useContext } from "react"
import { UserContext } from "../../contexts/UserProvider"
import { levelContext } from "../../contexts/UrlProvider"


export default function refreshHistory(string:string){
    const {username, token, setReadingHistory, friends, setFriends} = useContext(UserContext)
    const URL = useContext(levelContext)
    const requestedName = string

async function getReadingHistory(){
    let mine:Boolean = false;
    console.log(requestedName, username)
    if (requestedName == username){
        mine = true;
    } 

    let request = {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },}
           
        
        const response = await fetch(`${URL}api/history/${requestedName}`, request)

        if (response.ok){
            const data = await response.json()
            console.log(data)
            if (mine){
                setReadingHistory(data["history"])
                
            }
            else{
                let adjustment = friends;
                adjustment[requestedName]["readingHistory"] = data["history"]
                setFriends(adjustment)
            }
        }
    }

   return ( <>

        <button onClick={getReadingHistory} className = "refreshButton">Refresh History</button>
    </>)
}