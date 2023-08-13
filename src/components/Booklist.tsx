import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'


interface BookEntry {
    title:string,
    author:string,
    publishDate:string,
    image:string,
    priority:string,
    id:string
}
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
            const books = data["books"]
            console.log(data)
            setBookList(
                <>
                <ul>
                    {books.map((item:BookEntry) => (
                        <>
                        <li id={"BookList"+item.id} key={item.id}>
                            <div className="Box">
                               <h3>Title: {item.title}</h3> 
                               <p>Author: {item.author}</p>
                               <p>Publication Date: {item.publishDate}</p>
                               <p>Priority: {item.priority}</p>
                            </div>
                        </li>
                        </>
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