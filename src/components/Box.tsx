interface DisplayClassableProps{
    content: string;
}

export default function Box({ content }:DisplayClassableProps){

    return (
        <div className="Box">
        <h3> {content}</h3>
        </div>
    )



}