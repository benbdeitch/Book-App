import  {useRef, useContext, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { levelContext } from '../contexts/UrlProvider'

export default function LoginForm() {
    const URL  = useContext(levelContext)
    console.log(URL)
    const usernameField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    console.log(user)

    useEffect(() => {
        console.log('In useEffect')
      if (user.username) navigate('/')
    }, [user])


    function resetForm(){
        usernameField.current!.value = ''
        passwordField.current!.value = ''
    }



    async function handleUserData(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`${URL}api/signin`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                username: usernameField.current!.value, 
                password: passwordField.current!.value,
            }),
        }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            updateUserState(data)
            
        resetForm()
        } else window.alert('Invalid UserData');
    }



    function updateUserState(data:LoggedUser){
        setUser(data)
        localStorage.setItem('token', JSON.stringify(data["token"]))
        localStorage.setItem('username', JSON.stringify(data["username"]))
        localStorage.setItem('email', JSON.stringify(data["email"]))
        localStorage.setItem('friends', JSON.stringify(data["friends"]))
        localStorage.setItem('friendRequests', JSON.stringify(data["friendRequests"]))
        localStorage.setItem('readingList', JSON.stringify(data["readingList"]))
        localStorage.setItem('readingHistory', JSON.stringify(data["readingHistory"]))
        localStorage.setItem('recommendations', JSON.stringify(data["recommendations"]))
  
        console.log(
            data['readingHistory'][0].date)

    }
    return (
    <div>
        <h2>Login Form</h2>
        <form onSubmit={handleUserData} className="login-form">
        <label>
          Username:
          <br />
          <input type="text" ref={usernameField} required />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input type="password" ref={passwordField} required />
        </label><br />
        <button>Sign In</button>
      </form>


                </div>
            )
    }



