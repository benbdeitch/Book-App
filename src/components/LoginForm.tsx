import  {useRef, useContext, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'


export default function LoginForm() {
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
        const response = await fetch('http://127.0.0.1:5000/api/signin', {
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
            setUser({
                username:usernameField.current!.value.toString(),
                token: data.access_token
            })
        resetForm()
        } else window.alert('Invalid UserData');
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



