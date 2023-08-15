import { useNavigate, useParams } from "react-router-dom";
import Book from "../components/Book";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider";
import { Spinner } from "react-bootstrap";
import AddHistoryForm from "../forms/AddHistoryForm";




export default function bookPage(){
    let{string:string} = useParams()
    const navigate = useNavigate()
    const [bookData, setBookData] = useState(<Spinner/>)
    useEffect(() => {
        
        if (!user.username){ navigate('/')}
        if (string){
        getBook(string)
        }
      }, [])
      const {user} = useContext(UserContext)


    async function getBook(string:string){
        
        const response = await fetch(`http://127.0.0.1:5000/api/book/${string}`,  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (response.ok){
            let data = await response.json()
            setBookData(<>
            <Book input={data}/>
            <AddHistoryForm string = {string}/>
            </>)       }



    }
return (
    <>
    {bookData}
    

    </>
)



}