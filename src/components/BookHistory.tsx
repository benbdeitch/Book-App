import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import Book from "./Book"
import { Spinner } from "react-bootstrap"
import { useNavigate} from "react-router-dom"

import refreshHistory from "../buttons/refresh_buttons/refreshHistory"


export default function BookHistory({string}:encasedString){
    const user = useContext(UserContext)
    const username = string
    const navigate = useNavigate()
    const [readHistory, setReadHistory] = useState(<Spinner/>)
    const refreshButton = refreshHistory(username)

    useEffect(() => {
        
      
       
        if (!user.username || user.username!= string && !user.friends.hasOwnProperty(string)){
            navigate('/')
        }
        if (username){
        getReadingHistory()
        }
      }, [user.username, user.friends, user.readingHistory])

    function getReadingHistory(){
        let history:HistoryEntry[]
        let mine:boolean
        if (username == user.username){
            history = user.readingHistory
            mine = true
        }
        else if (username && user.friends.hasOwnProperty(username)){
            history = user.friends[username].readingHistory;
            console.log("Found Friend", history)
            mine = false
        }
        else{
            history = []
            mine = false
        }
        setReadHistory(
            <>
            {refreshButton}
            <ul>
            {history.length == 0? <div className="Box">
                <p>{mine? 'Your': 'Their'} reading history is empty!</p>
            </div>:<></>}
            {history.map((entry:HistoryEntry) => (
                
                <li key={entry.book.googleId}>
                    <div className="Box">
                        
                        <Book book= {entry["book"]}/>
                        {entry.rating?<> `Rating: ${entry.rating}/10`  <br/></>: <></>}
                        {entry.review?<>`Review: ${entry.review}`  <br/></> : <></>}
                      
                        Date Added: {entry.date}
                    </div>
                </li>
            ))}
           
            </ul>
            </>)
    }
    
        return (
            <>
            {readHistory}

            </>
        )

}