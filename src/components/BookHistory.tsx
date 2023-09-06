import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import Book from "./Book"
import { Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { levelContext } from "../contexts/UrlProvider"



export default function BookHistory(){
    const {user} = useContext(UserContext)
    const {username} = useParams()
    const navigate = useNavigate()
    const [readHistory, setReadHistory] = useState(<Spinner/>)
    const URL  = useContext(levelContext)
    useEffect(() => {
        
        if (!user.username){ navigate('/')}
        if (username){
        getReadingHistory()
        }
      }, [])

    function getReadingHistory(){
        setReadHistory(
            <>
            <ul>
            
            {user.readingHistory.map((entry:HistoryEntry) => (
                
                <li>
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