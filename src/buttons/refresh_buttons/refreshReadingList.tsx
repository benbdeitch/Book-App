import { useContext} from "react"
import { UserContext } from "../../contexts/UserProvider"

import { levelContext } from "../../contexts/UrlProvider"
import { useNavigate } from "react-router-dom"


export default function refreshReadingList(){
    const navigate = useNavigate()
    const URL = useContext(levelContext)
    const {token, setReadingList} = useContext(UserContext)
        async function getReadingList(){
            console.log("hi")
            let response = await fetch(`${URL}api/get-book-list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok){
                const data = await response.json()
                console.log(data)
                setReadingList(data["books"])
                localStorage.setItem('readingList', JSON.stringify(data["books"]))
            }
            else{
                navigate('/logout')
            }
        }
    
    
        return (
            <>
    
            <button onClick={getReadingList} className = "refreshButton">Refresh Reading List</button>
            </>
        )
    }
