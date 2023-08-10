interface DisplayObjectProps{

    Items: {
        string :string,
        key: string
}[]
}
import Box from "./Box"
export default function Flexbox({Items}:DisplayObjectProps){
    


    return (
        <>
            { Items.length > 0 && (
        <ul> 
            {Items.map((item) => ( 
                <li id={item.toString()} key={item.key}>
                <Box >

                
                </Box>
                </li>
            ))}
        </ul>
    )   } 
    </>)


}