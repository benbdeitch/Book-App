import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import Book from "./Book"
import { Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"



export default function BookHistory(){
    const {user} = useContext(UserContext)
    const {username} = useParams()
    const navigate = useNavigate()
    const [readHistory, setReadHistory] = useState(<Spinner/>)
    useEffect(() => {
        
        if (!user.username){ navigate('/')}
        if (username){
        getReadingHistory(username)
        }
      }, [])

      function updateReadingHistory(){
        if (username)
        getReadingHistory(username)
      }
    async function getReadingHistory(username:string){
        let request = {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
               
            }
            const response = await fetch(`http://127.0.0.1:5000/api/history/${username}`, request)

            if (response.ok){
                const data = await response.json()
                setReadHistory(
                    <>
                    <ul>
                    {data["history"].map((book:Book) => (
                        <li>
                            <Book input = {book}/>
                        </li>
                    ))}
                    </ul>
                    </>
                )
            }
        }
        return (
            <>
            {readHistory}
            <button onClick={updateReadingHistory}> refresh</button>
            </>
        )

}