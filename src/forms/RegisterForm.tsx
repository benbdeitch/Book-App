import  {useRef, useContext, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { levelContext } from '../contexts/UrlProvider'

export default function RegisterForm() {
    const URL  = useContext(levelContext)
    const usernameField = useRef<HTMLInputElement>(null)
    const emailField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() => {
        console.log('In useEffect')
      if (user.username) navigate('/')
    }, [user])



    async function handleUserData(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await fetch(`${URL}api/register`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                username: usernameField.current!.value, 
                password: passwordField.current!.value,
                email: emailField.current!.value
            }),
        }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            updateUserState(usernameField.current!.value, data["access_token"])
            

        } else {
            const data = await response.json();
            window.alert(Object.keys(data).reduce((string, key)=> (string + "\n" +key + ": " + data[key])));
        }
    }



    function updateUserState(username:string, token:string){
        setUser({
            username:username,
            token: token
        })
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('username', JSON.stringify(username))
        console.log(
            "Local Storage: " +localStorage.getItem("username"),
            localStorage.getItem("token"))

    }
    return (
    <div className = "Box">
        <h2>Register Form</h2>
        <form onSubmit={handleUserData} className="login-form">
        <label>
          Username:
          <br />
          <input type="text" ref={usernameField} required />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input type="text" ref={emailField} required />
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



