import { useContext } from "react"
import { UserContext } from "../../contexts/UserProvider"
import { levelContext } from "../../contexts/UrlProvider"
import updateToken from "../../static/helper_functions/updateToken"



export default function refreshFriendList(){
    const { token, setToken, setFriends} = useContext(UserContext)
    const URL  = useContext(levelContext)
    async function getFriendData(){
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
         }
        }

        const response = await fetch(`${URL}api/all-friends`, request)

        if (response.ok){
            const data = await response.json()
            console.log(data)
            setFriends(data["friends"])
            updateToken(data, setToken)
        }
      
    }

    return(<>

        <button onClick={getFriendData} className = "refreshButton">Refresh Friends</button>
        </>
    )
}
