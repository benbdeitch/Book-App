import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import Book from "./Book"
import History_Add_Button from "../buttons/History_Add_Button"
import RemoveFromListButton from "../buttons/RemoveFromListButton"
import { levelContext } from "../contexts/UrlProvider"




export default function Booklist(){
    const {user} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const navigate = useNavigate()
    useEffect(() => {
        
      if (!user.username){ navigate('/')}
      getBookList()
    }, [])
    const [bookList, setBookList] = useState(<Spinner />);
    function getBookList() {
       
        setBookList(
            <>
            <ul>
            {user.readingList? <></>: <div className = "Box"><h5>No books in list.</h5></div>}
            {user.readingList && user.readingList.length>0&& user.readingList.map((entry:ReadingListEntry) => (
                            <li id={entry.book.googleId} key={entry.book.googleId}>
                                <div className="Box">
                                <Book book={entry.book}></Book>
                                {entry.from? "From: " +entry.from: <></>}
                                Date Added: {entry.dateAdded}
                                <br/>
                                {entry.book.googleId ? <>
                                <History_Add_Button string={entry.book.googleId}/>
                                <RemoveFromListButton string={entry.book.googleId}/>
                                </>
                                : <> </>}
                                </div>
                                

                            </li>
                        ))}
            </ul>
            </>
        )
                                }




    return (
        <>
            {bookList}
        </>
    )



}