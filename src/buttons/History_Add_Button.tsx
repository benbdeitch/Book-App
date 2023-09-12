import { useNavigate } from "react-router-dom"





export default function History_Add_Button({book}:BookProperty){
    const navigate = useNavigate()
    function toBookPage(){
        navigate(`/book/${book.googleId}`)
    }

    return(
        <>
        <button onClick = {toBookPage}>
            Add to History?
        </button>
        
        </>
    )




}