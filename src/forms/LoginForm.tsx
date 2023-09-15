import  {useRef, useContext, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { levelContext } from '../contexts/UrlProvider'

export default function LoginForm() {
    const URL  = useContext(levelContext)
    console.log(URL)
    const usernameField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)
    const {username, setUsername, setReadingHistory, setEmail, setToken, setFriendRequests, setFriends, setReadingList, setRecommendations} = useContext(UserContext)
    const navigate = useNavigate()
    console.log(username)

    useEffect(() => {
        console.log('In useEffect')
      if (username) navigate('/')
    }, [username])


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
        setUsername(data["username"])
        setToken(data["token"])
        setEmail(data["email"])
        setReadingHistory(data["readingHistory"])
        setRecommendations(data["recommendations"])
        setFriends(data["friends"])
        setFriendRequests(data["friendRequests"])
        setReadingList(data["readingList"])
        localStorage.setItem('token', JSON.stringify(data["token"]))
        localStorage.setItem('username', JSON.stringify(data["username"]))
        localStorage.setItem('email', JSON.stringify(data["email"]))
        Object.keys(data["friends"]).length > 0 && localStorage.setItem('friends', JSON.stringify(data["friends"]))
        data["friendRequests"]["in"].length > 0 || data["friendRequests"]["out"].length > 0 && localStorage.setItem('friendRequests', JSON.stringify(data["friendRequests"]))
        data["readingList"].length > 0 && localStorage.setItem('readingList', JSON.stringify(data["readingList"]))
        data["readingHistory"].length > 0 && localStorage.setItem('readingHistory', JSON.stringify(data["readingHistory"]))
        data["recommendations"] && localStorage.setItem('recommendations', JSON.stringify(data["recommendations"]))

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



