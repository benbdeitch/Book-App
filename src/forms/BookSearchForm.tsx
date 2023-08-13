import  {useRef, useContext, FormEvent, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import History_Add_Button from '../buttons/History_Add_Button'
import Book from '../components/Book'


export default function BookSearchForm() {
    const titleField= useRef<HTMLInputElement>(null)
    const authorField = useRef<HTMLInputElement>(null)
    let { user } = useContext(UserContext)
    const navigate = useNavigate()
    user = user
    useEffect(() => {
       
      if (!user.username) navigate('/')
    }, [user])
    }

    const [bookData, setBookData] = useState(<Spinner />);



    async function getBookSearch(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        let request ={
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({
                'title': 'Moby'
            })
        }
        const response = await fetch('http://127.0.0.1:5000/api/book-search', request) 

             
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
                                </li>
                            ))}

                        </ul>
                    )}
                </>)
        } else setBookData(<><h1>No books Found</h1></>);
        



    
  }

    return (
    <div>
        <h2>Book Search Form</h2>
        <form onSubmit={handleUserData} className="login-form">
        <label>
          Title
          <br />
          <input type="text" ref={titleField} />
        </label>
        <br />
        <label>
          Author:
          <br />
          <input type="password" ref={authorField} />
        </label><br />
        <button>Search</button>
      </form>


                </div>
            )
    }
