async function getFriendData(){
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        }
    }

    const response = await fetch(`${URL}api/all-friends`, request)

    if (response.ok){
        const data = await response.json()
        console.log(data)
        setFriendData(<>
        {data["friends"] && data["friends"].length > 0 && 
        data["friends"].map((friend:UserData) => (
            <div onClick={()=> {toFriendProfile(friend.username)}} className = "Box" key={friend.username}>
                <p>Username: {friend.username}</p>
                <FriendButton string={friend.username}/>
            </div>

        ))}
        </>)
    }
}
