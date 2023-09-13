import { useNavigate } from "react-router-dom"
import History_Add_Button from "../buttons/History_Add_Button"
import List_Add_Button from "../buttons/List_Add_Button"


export default function Book({book}:BookProperty):JSX.Element{
    const navigate = useNavigate()

    function toBookPage(){
        navigate(`/book/${book.googleId}`)
    }
    return(
        <tr>
            <td>
                {book.image? <img src={book.image.imgSml} onClick={toBookPage}></img>: <img src="http://place-hold.it/75" onClick={toBookPage}></img>}
            </td>
            <td>
                {book.title.length>23? book.title.substring(0,20)+"...":book.title}
            </td>
            <td>
                {book.author? book.author.length>23? book.title.substring(0,20)+"...":book.author : "No listed author"}
            </td>
            <td>
                <History_Add_Button book={book}/>
            </td>
            <td>
                <List_Add_Button book = {book}/>
            </td>
        </tr>
        )
}