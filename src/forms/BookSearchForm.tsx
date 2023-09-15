import  {useRef, useContext, FormEvent, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'

import { levelContext } from '../contexts/UrlProvider'
import BookRow from '../components/BookRow'

export default function BookSearchForm() {
    const titleField= useRef<HTMLInputElement>(null)
    const authorField = useRef<HTMLInputElement>(null)
    const pageNumber = useRef(1)
    const [pagination, setPagination] = useState(<></>)
    const author = useRef<string|null>(null)
    const title = useRef<string|null>(null)
    let { username, token} = useContext(UserContext)
    const navigate = useNavigate()
    const URL  = useContext(levelContext)

    useEffect(() => {
       
      if (!username) navigate('/')
    }, [username])
    

    const [bookData, setBookData] = useState(<></>);

    function initializeSearch(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (titleField.current){
            title.current = titleField.current.value;
            console.log(title)
        }
        if (authorField.current){
            author.current = authorField.current.value
        }
        getBookSearch(0)
    }

    async function getBookSearch(startIndex:number) {
        
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
                'title': title.current,
                'author': author.current,
                'startIndex': startIndex *10
            })
        }
        pageNumber.current = Math.ceil(startIndex/10)
        console.log(request)
        const response = await fetch(`${URL}api/book-search`, request) 
        setBookData(<Spinner />)
             
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            let pageButtonMapping:number[] = []
            if (data["totalItems"]<11){
                pageButtonMapping = [1]
            } 
            else{
                for (let i = 1; i<Math.ceil(data["totalItems"]/10); i++){
                    pageButtonMapping.push(i)
                }
            }
            setPagination(<div className="Box">{pageButtonMapping.map((number) => (number == pageNumber.current?<button key={"button"+number} onClick={()=>(getBookSearch(number))} disabled>{number} </button>:<button key={"button"+number} onClick={()=>(getBookSearch(number))}>{number}</button>))}</div>)
            console.log(pagination)
            setBookData( 
                <>
                    <h1 className="Box">Search Page</h1>
                    {pagination}
                    <table className="Box">
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                            </tr>
                            {data["books"].length> 0 && data["books"].map((book:Book) => (
                               <BookRow key={"BookRow"+book.googleId} book={book}/>
                            ))}
                        </tbody>
                    </table>
                    
                    {pagination}
 
                </>)
        } else setBookData(<div className="Box"><h1>No books found.</h1></div>);
        



    
  }

    return (
        <>
    <div className = "Box">
        <h2>Book Search Form</h2>
        <form onSubmit={initializeSearch} className="book-search-form">
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
        <br/>
        <button>Search</button>
      </form>


                </div>
            
                {bookData}
               
    </>
            )
    }
