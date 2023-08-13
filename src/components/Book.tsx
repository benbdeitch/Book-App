


export default function Book({input}:BookProperty):JSX.Element{

    return (
        <>
        <div className="Box">
            <img src={input.image}></img>
            <div> 
            Title: {input.title}<br/>
            Author: {input.author ?? "Unknown"}<br/>
            Publication Date: {input.publishDate ?? "No Date Provided"}

            </div>
        </div>
        </>
    )
}