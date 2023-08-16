import { useState, useContext, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import Book from "../components/Book"
import { UserContext } from "../contexts/UserProvider"
import AcceptDeclineRecommendationButton from "../buttons/AcceptDeclineRecommendationButton"
import { levelContext } from "../contexts/UrlProvider"

export default function RecommendationsPage(){
    const URL  = useContext(levelContext)
    const [recState, setRecState] = useState(<Spinner/>)
    const {user} = useContext(UserContext)
    useEffect(()=>{
        getRecommendations()
    }, [user]
    )


    async function getRecommendations(){
    
        const response = await fetch(`${URL}api/my-recommendations`,  {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if (response.ok){
                let data = await response.json()
                console.log(data)
                setRecState(<>
                <div className="Box">
                    <h1> Your Recommendations</h1>
                </div>
                {data["recommendations"].length == 0?<><div className="Box"><h5>No Recommendations</h5></div></> : null}
                {data["recommendations"].length>0 && 
                data["recommendations"].map((item:Book)=> (<>
                <div className="Box">
                    <Book input={item}/>
                    {item.requestId?
                <AcceptDeclineRecommendationButton string={item.requestId}/>: null}
                </div>
     
                </>))}

                </>)       }
        
    }
    return(<>
    {recState}</>)
}   