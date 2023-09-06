async function loadRequests(){
    let response = await fetch(`${URL}api/friend-requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        }
    })
    if (response.ok){
        const data = await response.json()
        console.log(data)
        let array = data["requests"]