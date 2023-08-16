import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserProvider"

export default function RemoveFromListButton({string}:encasedString){
    const {user} = useContext(UserContext)
    const buttonOptions= [<button onClick={removeFromList}>Remove from List?</button>, <div className="Box">Item Removed</div>]
    const [buttonState, setButtonState] = useState(buttonOptions[0])
    async function removeFromList(){
        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({googleId: string})
        }

        const response = await fetch('http://127.0.0.1:5000/api/delete-list', request)

        if (response.ok){
            const data = await response.json();
            alert(data["success"])
            setButtonState(buttonOptions[1])
        }
    }



    return(
        <>
        {buttonState}
        </>)
}