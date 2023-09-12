import {createContext, Dispatch, SetStateAction, useState} from 'react'

interface UserContextValues{
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    readingList: ReadingListEntry[],
    setReadingList: Dispatch<SetStateAction<ReadingListEntry[]>>,
    recommendations: BookRecommendations,
    setRecommendations: Dispatch<SetStateAction<BookRecommendations>>,
    readingHistory: HistoryEntry[],
    setReadingHistory: Dispatch<SetStateAction<HistoryEntry[]>>,
    friends: FriendList,
    setFriends: Dispatch<SetStateAction<FriendList>>,
    friendRequests: AllRequest,
    setFriendRequests:Dispatch<SetStateAction<AllRequest>>
}



export const UserContext = createContext({} as UserContextValues)

export default function AuthProvider({ children }:{children:JSX.Element | JSX.Element[]}){

    const [username, setUsername] = useState<string>("")
    const [token, setToken] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [readingList, setReadingList] = useState<ReadingListEntry[]>([])
    const [recommendations, setRecommendations] = useState<BookRecommendations>({"in":[], "out":[]})
    const [readingHistory, setReadingHistory] = useState<HistoryEntry[]>([])
    const [friends, setFriends] = useState<FriendList>({})
    const [friendRequests, setFriendRequests] = useState<AllRequest>({"in":[], "out":[]})

    
    const value = {
        username, setUsername, token, setToken, email, setEmail, readingList, setReadingList, recommendations, setRecommendations, friends, setFriends, readingHistory, setReadingHistory, friendRequests, setFriendRequests}
    
        return <UserContext.Provider value={value}>
            {children }
            </UserContext.Provider>

}