import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserProvider"
import Book from "../../components/Book"
import { Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { levelContext } from "../../contexts/UrlProvider"


export default function historyRefresh({setReadHistory}){
    const {user} = useContext(UserContext)

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
            console.log(data)
            setReadHistory(
                <>
                <ul>
                {data["history"].map((book:Book) => (
                    <li>
                        <Book book = {book}/>
                    </li>
                ))}
                </ul>
                </>
            )
        }
    }
}