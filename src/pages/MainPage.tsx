import Flexbox from "../components/Flexbox"
import {v4 as uuidv4} from 'uuid';

export default function MainPage(){



    return (
            
            <Flexbox Items={[{string: "hi", key: uuidv4}, {string: "hello", key: uuidv4}, {string:"How do you do", key:uuidv4}, {string: "342", key:uuidv4}]}/>
 )


}