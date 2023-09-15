

export default function logout(UserContextValues: any){
    const {setUsername, setReadingHistory, setEmail, setToken, setFriendRequests, setFriends, setReadingList, setRecommendations} = UserContextValues
    setUsername('')
    setToken('')
    setEmail('')
    setFriends({})
    setRecommendations({"in":[], "out":[]})
    setReadingList([])
    setFriendRequests({"in":[], "out":[]})
    setReadingHistory([])

    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem('email')
    localStorage.removeItem('friends')
    localStorage.removeItem('friendRequests')
    localStorage.removeItem('readingList')
    localStorage.removeItem('readingHistory')
    localStorage.removeItem('recommendations')
}