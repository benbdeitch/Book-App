interface DisplayObjectProps{

    Items: string[]
}
import Box from "./Box"

export default function Flexbox({Items}:DisplayObjectProps){
    


    return (
        <>
            { Items.length > 0 && (
        <ul> 
            {Items.map((item) => ( 
                <li id={item}>
                    {'  '}
                    <Box content = {item.toString()} />

                </li>

            ))}
        </ul>
    )   } 
    </>)


}