import { useNavigate } from "react-router-dom"





export default function History_Add_Button({string}:encasedString){
    const navigate = useNavigate()
    function toBookPage(){
        navigate(`/book/${string}`)
    }

    return(
        <>
        <button onClick = {toBookPage}>
            Add to History?
        </button>
        
        </>
    )




}