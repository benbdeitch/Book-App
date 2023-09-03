
import { useContext } from "react";
import Booklist from "../components/ReadingList";
import { UserContext } from "../contexts/UserProvider";


export default function ListPage(){
    const {user} = useContext(UserContext)

    return(<>
    <div className="Box">
    <h1>{user.username}'s List Page </h1>
    </div>
    <Booklist/>
    </>)
}