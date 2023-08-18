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
        getReadingHistory(username)
        }
      }, [])


    async function getReadingHistory(username:string){
        let request = {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
               
            }
            const response = await fetch(`${URL}api/history/${username}`, request)

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

            </>
        )

}