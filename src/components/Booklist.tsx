import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"




export default function Booklist(){
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        
      if (!user.username){ navigate('/')}
      getBookList()
    }, [])
    
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
            

        }
    }






    return (
        <>
        <h3>{user.token}</h3>
        </>
    )



}