import  {useRef, useContext, FormEvent, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import { levelContext } from '../contexts/UrlProvider'


export default function RecommendForm({string}:encasedString) {
    const friendField = useRef<HTMLSelectElement>(null)
    const messageField = useRef<HTMLInputElement>(null)
    const {user} = useContext(UserContext)
    const URL  = useContext(levelContext)
    const [formState, setFormState] = useState(<Spinner/>)
    
    useEffect(() => {
        console.log('In useEffect')
        getFriendData()

    }, [user])


    function resetForm() {
        messageField.current!.value = ""
    }

    async function getFriendData(){
            
            setFormState(<div className="Box  smallBox">
                <h2>Recommend To:</h2>
                <form onSubmit={handleRecommendData} className="recommend-form">
                <label>
                  Message:
                  <br />
                  <input type="text" ref={messageField} required />
                </label>
                <br />
                <label>
                  Recommend To:
                  <br />
                  <select ref={friendField} required>

                    {Object.keys(user.friends).length>0 && Object.keys(user.friends).map((friend) => {
                        console.log(friend)
                        return (<option value={friend}>{friend}</option>)
                    })}
                    </select>

                </label><br /><br />
                <button>Recommend Book</button>
              </form>
        
        
                        </div>)
        }
    
    
    async function handleRecommendData(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let request =  {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
                body: JSON.stringify({
                toUsername: friendField.current!.value, 
                    message: messageField.current!.value,
                    googleId: string
                }),
            }
            console.log(request["body"])
        const response = await fetch(`${URL}api/recommend-book`,request);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert(`Book successfully recommended to ${friendField.current!.value}`)
        resetForm()
        } else window.alert('Error, book not recommended.')
    }



    
    return (<>
        {formState}
        </>
            )
    }



