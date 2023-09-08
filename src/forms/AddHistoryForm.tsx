import { useRef, useContext, useEffect, FormEvent } from "react"
import { UserContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { levelContext } from "../contexts/UrlProvider"





export default function HistoryForm({book}:BookProperty){
    const URL  = useContext(levelContext)
    const navigate = useNavigate()
    const ratingField = useRef<HTMLInputElement>(null)
    const reviewField = useRef<HTMLInputElement>(null)
    const {username, token, readingHistory, setReadingHistory} = useContext(UserContext)
    useEffect(() => {

      if (!username) navigate('/')
    }, [username])

    function resetForm(){
        ratingField.current!.value = ''
        reviewField.current!.value = ''
    }



    async function addToHistory(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`${URL}api/add-history`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
            body: JSON.stringify({
                rating: ratingField.current!.value, 
                review: reviewField.current!.value.slice(0,10000),
                googleId: book.googleId
            }),
        }
        );
        if (response.ok) {
            const data = await response.json();
            alert(data["Success"])
            resetForm()
            let history = readingHistory
            let newEntry = {'book':book, 'rating':parseInt(ratingField.current!.value),'review': reviewField.current!.value.slice(0,10000), 'date': Date()}
            history.push(newEntry)
            console.log(newEntry)
            setReadingHistory(history)
        } else{
            const data = await response.json();
            window.alert(data["msg"]);
        } 
    }

    return( 

        <div className = "Box  smallBox">
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
        <button>Add to your History</button>
      </form>
      </div>
    )

}