
import { useContext } from "react";
import Booklist from "../components/ReadingList";
import { UserContext } from "../contexts/UserProvider";
import refreshReadingList from "../buttons/refresh_buttons/refreshReadingList";


export default function ListPage(){
    const {username} = useContext(UserContext)
    const refreshButton =    refreshReadingList()
    return(<>
  
    <div className="Box">
    <h1>{username}'s List Page </h1>
    
    </div>
    {refreshButton}
    <Booklist/>
    </>)
}