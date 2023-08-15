import { useNavigate } from "react-router-dom"



export default function Book({input}:BookProperty):JSX.Element{
    const navigate = useNavigate()

    function toBookPage(){
        navigate(`/book/${input.googleId}`)
    }
    return (
        <>
        <div className="Box">
            <img src={input.image} onClick={toBookPage}></img>
            <div> 
            Title: {input.title}<br/>
            Author: {input.author ?? "Unknown"}<br/>
            Publication Date: {input.publishDate ?? "No Date Provided"}<br/>
            {input.rating? `Rating: ${input.rating}/10`: null}<br/>
            {input.review? `Rating: ${input.review}`: null}
            {input.message? `Message: ${input.message}`: null}
            </div>
        </div>
        </>
    )
}