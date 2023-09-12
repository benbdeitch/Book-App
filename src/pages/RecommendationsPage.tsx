import { useState, useContext, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import Book from "../components/Book"
import { UserContext } from "../contexts/UserProvider"
import AcceptDeclineRecommendationButton from "../buttons/AcceptDeclineRecommendationButton"
import { levelContext } from "../contexts/UrlProvider"

export default function RecommendationsPage(){
    const URL  = useContext(levelContext)
    const [recState, setRecState] = useState(<Spinner/>)
    const {username, recommendations} = useContext(UserContext)
    useEffect(()=>{
        getRecommendations()
    }, [username]
    )

    function getRecommendations(){
        setRecState(<>
            <div className="Box">
                <h1> Incoming Recommendations</h1>
           
            {recommendations.in.length== 0?<><div className="Box"><h5>You have no incoming recommendations.</h5></div></> : 

            recommendations.in.map((bookRec:InBookRecommendation)=> (<>
          
                <Book book={bookRec.book}/>
                <h5>`From: ${bookRec.from}`</h5>
                <br/>
                <h5> `Date Added: ${bookRec.dateAdded}</h5>`
                {bookRec.requestId?
            <AcceptDeclineRecommendationButton bookRec={bookRec}/>: null}
        
                    
            </>))}
            </div>
            <div className="Box">
                <h1> Outgoing Recommendations</h1>
           
            {recommendations.out.length== 0?<><div className="Box"><h5>You have no outgoing recommendations.</h5></div></> : 

            recommendations.out.map((bookRec:OutBookRecommendation)=> (<>
          
                <Book book={bookRec.book}/>
                <h5>`From: ${bookRec.to}`</h5>
                <br/>
                <h5> `Date Added: ${bookRec.dateAdded}</h5>`
                {bookRec.requestId?
            <AcceptDeclineRecommendationButton bookRec={bookRec}/>: null}
        
                    
            </>))}
            </div>


            </>)       }

    
    return(<>
    {recState}</>)
}   