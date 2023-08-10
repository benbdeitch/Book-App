import {createContext, Dispatch, SetStateAction, useState} from 'react'



export const UserSearched = createContext({} as UserContextValues)

export default function AuthProvider({ children }:{children:JSX.Element | JSX.Element[]}){
    const [user, setUser] = useState<LoggedUser>({username:'', token:''})    

    const value = {
        user, 
        setUser}
    
        return <UserSearched.Provider value={value}>
            {children }
            </UserSearched.Provider>

}