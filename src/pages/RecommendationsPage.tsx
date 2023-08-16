import { useState, useContext, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import Book from "../components/Book"
import { UserContext } from "../contexts/UserProvider"
import AcceptDeclineRecommendationButton from "../buttons/AcceptDeclineRecommendationButton"

export default function RecommendationsPage(){
    const [recState, setRecState] = useState(<Spinner/>)
    const {user} = useContext(UserContext)
    useEffect(()=>{
        getRecommendations()
    }, [user]
    )


    async function getRecommendations(){
    
        const response = await fetch(`http://127.0.0.1:5000/api/my-recommendations`,  {
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