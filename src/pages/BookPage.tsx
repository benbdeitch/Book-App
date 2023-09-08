import { useNavigate, useParams } from "react-router-dom";
import Book from "../components/Book";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { Spinner } from "react-bootstrap";
import AddHistoryForm from "../forms/AddHistoryForm";
import RecommendBookForm from "../forms/RecommendBookForm";
import { levelContext } from "../contexts/UrlProvider";




export default function bookPage(){
    const URL  = useContext(levelContext)
    let{string:string} = useParams()
    const navigate = useNavigate()
    const {username, token} = useContext(UserContext)
    const [bookData, setBookData] = useState(<Spinner/>)
    useEffect(() => {
        
        if (!username){ navigate('/')}
        if (string){
        getBook(string)
        }
      }, [username])



    async function getBook(string:string){
        
        const response = await fetch(`${URL}api/book/${string}`,  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.ok){
            let data = await response.json()
            setBookData(<div className="Flexbox">
            <div className = "Box">
                <Book book={data}/>
            </div>
            <AddHistoryForm book = {data}/>
            <RecommendBookForm string = {string}/>
            </div>)       }



    }
return (
    <>
   
    {bookData}
    

    </>
)



}