import { useParams } from "react-router-dom"
import BookHistory from "../components/BookHistory"


export default function BookHistoryPage(){
    const{username} = useParams()

    return(<>
        <div className = "Box"><h1> {username}'s History Page</h1></div>
        <BookHistory/>

    </>)
}