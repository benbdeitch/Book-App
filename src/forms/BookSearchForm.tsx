import  {useRef, useContext, FormEvent, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import History_Add_Button from '../buttons/History_Add_Button'


import List_Add_Button from '../buttons/List_Add_Button'
import { levelContext } from '../contexts/UrlProvider'
import BookRow from '../components/BookRow'

export default function BookSearchForm() {
    const titleField= useRef<HTMLInputElement>(null)
    const authorField = useRef<HTMLInputElement>(null)
    const entryField = useRef<HTMLInputElement>(null)
    let { username, token} = useContext(UserContext)
    const navigate = useNavigate()
    const URL  = useContext(levelContext)

    useEffect(() => {
       
      if (!username) navigate('/')
    }, [username])
    

    const [bookData, setBookData] = useState(<></>);



    async function getBookSearch(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let title:string|null = null; 
        let author:string|null = null;
        let howManyEntries:string|null = null;
        if (titleField.current){
            title = titleField.current.value;
        }
        if (authorField.current){
            author = authorField.current.value
        }
        if (entryField.current){
            if (entryField.current.value){
                howManyEntries = entryField.current.value 
            }
            else{
                 howManyEntries = "10"
            }
        }
        if (!title &&!author){
            setBookData(<><p className ="Box">Error: Neither title nor author provided.</p></>);
            return ("")
        }
        let request ={
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'title': title,
                'author': author,
                'startIndex': howManyEntries
            })
        }
        console.log(request)
        const response = await fetch(`${URL}api/book-search`, request) 
        setBookData(<Spinner />)
             
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setBookData( 
                <>
                 <h1 className="Box">Search Page</h1>
                <table className="Box">
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                 
               
                    {data["books"].length> 0 && 
                       
                            data["books"].map((book:Book) => (
                               <BookRow book={book}/>
                            )

                       
                    )}
                    </table>
                </>)
        } else setBookData(<div className="Box"><h1>No books found.</h1></div>);
        



    
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

        <label>
            #Entries:
            <br />
            <input type="number" ref={entryField}/>
        </label>
        <br/>
        <button>Search</button>
      </form>


                </div>
            
                {bookData}
               
    </>
            )
    }
