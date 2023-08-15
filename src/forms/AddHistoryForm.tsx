import { useRef, useContext, useEffect, FormEvent } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"





export default function HistoryForm({string}:encasedString){
    const navigate = useNavigate()
    const ratingField = useRef<HTMLInputElement>(null)
    const reviewField = useRef<HTMLInputElement>(null)
    const {user} = useContext(UserContext)
    useEffect(() => {

      if (!user.username) navigate('/')
    }, [user])

    function resetForm(){
        ratingField.current!.value = ''
        reviewField.current!.value = ''
    }



    async function addToHistory(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(user.token)
        const response = await fetch(`http://127.0.0.1:5000/api/add-history`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        },
            body: JSON.stringify({
                rating: ratingField.current!.value, 
                review: reviewField.current!.value,
                googleId: string
            }),
        }
        );
        if (response.ok) {
            const data = await response.json();
            alert(data["Success"])
            resetForm()
        } else{
            const data = await response.json();
            window.alert(data["msg"]);
        } 
    }

    return( 

        <div className = "Box">
        <h2>Review Form</h2>
        <form onSubmit={addToHistory} className="login-form">
        <label>
          Rating: 0-10
          <br />
          <input type="number" ref={ratingField} required />
        </label>
        <br />
        <label>
         Review:
          <br />
          <input type="text" ref={reviewField} required />
        </label><br /><br />
        <button>Add to History</button>
      </form>
      </div>
    )

}