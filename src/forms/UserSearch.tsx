import { FormEvent, useRef} from "react"

import {useNavigate} from 'react-router-dom'
export default function UserSearch(){
    const usernameField = useRef<HTMLInputElement>(null)
    
    const navigate = useNavigate()
    
    
    
    async function getUser(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();{
        console.log(usernameField.current!.value)
        navigate(`/user-profile/${usernameField.current!.value}`)
        
    }
   

}
    return (
        <div>
            <form onSubmit={getUser} className="userSearch">
                <input type="text" ref={usernameField} required />
                <button>Search User</button>
            </form>
        </div>
        )
}