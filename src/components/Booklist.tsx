import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import Book from "./Book"
import History_Add_Button from "../buttons/History_Add_Button"




export default function Booklist(){
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        
      if (!user.username){ navigate('/')}
      getBookList()
    }, [])
    const [bookList, setBookList] = useState(<Spinner />);
    async function getBookList() {
        const response = await fetch('http://127.0.0.1:5000/api/get-book-list', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }

        })
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setBookList(
                <>
                <ul>
                {data["books"]? <></>: <div className = "Box"><h5>No books in list.</h5></div>}
                {data["books"] && data["books"].length>0&& data["books"].map((book:Book) => (
                                <li id={book.googleId} key={book.googleId}>
                                    <Book input={book}></Book>
                                    {book.googleId ? 
                                    <History_Add_Button string={book.googleId}/> : <> </>}
                                   
                                </li>
                            ))}
                </ul>
                </>
            )
        }
    }






    return (
        <>
            {bookList}
        </>
    )



}