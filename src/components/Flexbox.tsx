interface DisplayObjectProps{

    Items: string[]
}
import Box from "./Box"

export default function Flexbox({Items}:DisplayObjectProps){
    


    return (
        <>
            { Items.length > 0 && (
        <ul> 
            {Items.map((item,i) => ( 
                <Box>
                <li id={item.toString()} key={i}>
                    {'  '}
                {item}

                </li>
                </Box>
            ))}
        </ul>
    )   } 
    </>)


}