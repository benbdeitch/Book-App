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

    function getRecommendations(){
        setRecState(<>
            <div className="Box">
                <h1> Your Recommendations</h1>
            </div>
            {user.recommendations?<><div className="Box"><h5>You have no incoming recommendations.</h5></div></> : 

            user.recommendations.map((bookRec:BookRecommendation)=> (<>
            <div className="Box">
                <Book book={bookRec.book}/>
                <h5>`From: ${bookRec.from}`</h5>
                <br/>
                <h5> `Date Added: ${bookRec.dateAdded}</h5>`
                {bookRec.requestId?
            <AcceptDeclineRecommendationButton string={bookRec.requestId}/>: null}
            </div>
 
            </>))}

            </>)       }

    
    return(<>
    {recState}</>)
}   