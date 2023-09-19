import { useContext} from "react"
import { UserContext } from "../../contexts/UserProvider"

import { levelContext } from "../../contexts/UrlProvider"



export default function refreshRecommendations(){

    const URL = useContext(levelContext)
    const {token, setRecommendations} = useContext(UserContext)
        async function getRecommendations(){
            console.log("hi")
            let response = await fetch(`${URL}api/my-recommendations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok){
                const data = await response.json()
                console.log(data)
                setRecommendations(data["recommendations"])
                localStorage.setItem('recommendations', JSON.stringify(data["recommendations"]))
            }
        }
    
    
        return (
            <>
    
            <button onClick={getRecommendations} className = "refreshButton">Refresh Reading List</button>
            </>
        )
    }