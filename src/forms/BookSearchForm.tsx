import  {useRef, useContext, FormEvent, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import History_Add_Button from '../buttons/History_Add_Button'
import Book from '../components/Book'

import List_Add_Button from '../buttons/List_Add_Button'

export default function BookSearchForm() {
    const titleField= useRef<HTMLInputElement>(null)
    const authorField = useRef<HTMLInputElement>(null)
    let { user} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
       
      if (!user.username) navigate('/')
    }, [user])
    

    const [bookData, setBookData] = useState(<></>);



    async function getBookSearch(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let title:string|null = null; 
        let author:string|null = null;
        if (titleField.current){
            title = titleField.current.value;
        }
        if (authorField.current){
            author = authorField.current.value
        }

        if (!title &&!author){
            setBookData(<><p>Error: Neither title nor author provided.</p></>);
            return ("")
        }
        let request ={
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({
                'title': title,
                'author': author
            })
        }
        const response = await fetch(`http://127.0.0.1:5000/api/book-search`, request) 
        setBookData(<Spinner />)
             
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setBookData( 
                <>
                <h1>Search Page</h1>
                    {data["books"].length> 0 && (
                        <ul>
                            {data["books"].map((book:Book) => (
                                <li id={book.googleId} key={book.googleId}>
                                    <Book input={book}></Book>
                                    <History_Add_Button string={book.googleId}/>
                                    <List_Add_Button string = {book.googleId}/>
                                </li>
                            ))}

                        </ul>
                    )}
                </>)
        } else setBookData(<><h1>No books Found</h1></>);
        



    
  }

    return (
        <>
    <div className = "Box">
        <h2>Book Search Form</h2>
        <form onSubmit={getBookSearch} className="book-search-form">
        <label>
          Title
          <br />
          <input type="text" ref={titleField} />
        </label>
        <br />
        <label>
          Author:
          <br />
          <input type="text" ref={authorField} />
        </label><br />
        <button>Search</button>
      </form>


                </div>
                {bookData}
    </>
            )
    }
