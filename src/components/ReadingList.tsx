import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import Book from "./Book"
import History_Add_Button from "../buttons/History_Add_Button"
import RemoveFromListButton from "../buttons/RemoveFromListButton"
import { levelContext } from "../contexts/UrlProvider"




export default function Booklist(){
    const {readingList, username} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const navigate = useNavigate()
    useEffect(() => {
        
      if (!username){ navigate('/')}
      getBookList()
    }, [])
    const [bookList, setBookList] = useState(<Spinner />);
    function getBookList() {
       
        setBookList(
            <>
            <ul>
            {readingList.length>0? <></>: <div className = "Box"><h5>Your reading list is empty!</h5></div>}
            {readingList && readingList.length>0&& readingList.map((entry:ReadingListEntry) => (
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