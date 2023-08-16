import { useNavigate } from "react-router-dom"



export default function Book({input}:BookProperty):JSX.Element{
    const navigate = useNavigate()

    function toBookPage(){
        navigate(`/book/${input.googleId}`)
    }
    return (
        <>
        <div className="Box">
            {input.image? <img src={input.image} onClick={toBookPage}></img>: <img src="http://place-hold.it/75" onClick={toBookPage}></img>}
            <div> 
            Title: {input.title}<br/>
            Author: {input.author ?? "Unknown"}<br/>
            Publication Date: {input.publishDate ?? "No Date Provided"}
            {input.rating? <>`Rating: ${input.rating}/10`<br/></>: null}
            {input.review? <>`Rating: ${input.review}`<br/></>: null}
            {input.message? <>`Message: ${input.message}`<br/></>: null}<br/>
            {input.from? `From: ${input.from}`: null}
            </div>
        </div>
        </>
    )
}