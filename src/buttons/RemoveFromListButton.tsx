import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"

export default function RemoveFromListButton({string}:encasedString){
    const {token} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const buttonOptions= [<button onClick={removeFromList}>Remove from List?</button>, <div className="Box">Item Removed</div>]
    const [buttonState, setButtonState] = useState(buttonOptions[0])

    async function removeFromList(){
        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({googleId: string})
        }
        console.log(request)
        const response = await fetch(`${URL}api/delete-list`, request)

        if (response.ok){
            const data = await response.json();
            console.log(data)
            alert(data["Success"])
            setButtonState(buttonOptions[1])
        }
        else{
            const data = await response.json();
            console.log(data)
        }
    }



    return(
        <>
        {buttonState}
        </>)
}