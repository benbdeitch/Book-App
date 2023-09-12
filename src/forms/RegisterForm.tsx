import  {useRef, useContext, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { levelContext } from '../contexts/UrlProvider'

export default function RegisterForm() {
    const URL  = useContext(levelContext)
    const usernameField = useRef<HTMLInputElement>(null)
    const emailField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)
    const passwordField2 = useRef<HTMLInputElement>(null)
    const {username, setUsername, setEmail, setToken} = useContext(UserContext)
    const navigate = useNavigate()


    useEffect(() => {
        console.log('In useEffect')
      if (username) navigate('/')
    }, [username])



    async function handleUserData(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (passwordField2.current!.value != passwordField.current!.value){
            window.alert("Passwords do not match")
            return;
        }
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
            updateUserState(usernameField.current!.value, data["access_token"], emailField.current!.value)
            

        } else {
            const data = await response.json();
            window.alert(Object.keys(data).reduce((string, key)=> (string + "\n" + data[key]), ""));
        }
    }



    function updateUserState(username:string, token:string, email:string){
        setUsername(username)
        setToken(token)
        setEmail(email)
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
        <label>
          Re-enter Password:
          <br />
          <input type="password" ref={passwordField2} required />
        </label><br />
        <button>Register</button>
      </form>


                </div>
            )
    }



