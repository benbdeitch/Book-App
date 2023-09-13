import { useNavigate } from "react-router-dom"



export default function Book({book}:BookProperty):JSX.Element{
    const navigate = useNavigate()

    function toBookPage(){
        navigate(`/book/${book.googleId}`)
    }
    return (
        <>

            {book.image? <img src={book.image.img} onClick={toBookPage}></img>: <img src="http://place-hold.it/75" onClick={toBookPage}></img>}
            <div> 
            Title: {book.title}<br/>
            Author: {book.author ?? "Unknown"}<br/>
            Publication Date: {<>{book.publishDate} <br/></>?? "No Date Provided"}
            </div>

        </>
    )
}