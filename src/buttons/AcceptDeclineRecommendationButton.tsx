import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserProvider"
import { levelContext } from "../contexts/UrlProvider"


export default function AcceptDeclineRecommendationButton({string}:encasedString){
    const {user} = useContext(UserContext)
    const URL  = useContext(levelContext)
    let buttonOptions= [ <>
        <button onClick={acceptRecommendation}> Accept</button>
        <button onClick={declineRecommendation}>Decline</button>
        </>, 
        <div className="Box"><p>Accepted Recommendation</p></div>, <div className="Box"><p>Declined Recommendation</p></div>]
    const [buttonState, setButtonState] = useState(buttonOptions[0])
    async function acceptRecommendation(){
        let response = await fetch(`${URL}api/accept-rec`,{
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({"index": string})
            })
            if (response.ok){
                alert(`Recommendation has been accepted.`)
                setButtonState(buttonOptions[1])
            }
    }

    async function declineRecommendation(){
        let response = await fetch(`${URL}api/deny-rec`,{
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({"index": string})
        })
        if (response.ok){
            alert(`Recommendation has been declined`)
            setButtonState(buttonOptions[2])
        }
    }

    return(
        <>
        {buttonState}
        </>
    )
}