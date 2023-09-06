async function getRecommendations(){
    
    const response = await fetch(`${URL}api/my-recommendations`,  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        if (response.ok){
            let data = await response.json()
            console.log(data)
            setRecState(<>
            <div className="Box">
                <h1> Your Recommendations</h1>
            </div>
            {data["recommendations"].length == 0?<><div className="Box"><h5>You have no incoming recommendations.</h5></div></> : 

            data["recommendations"].map((item:Book)=> (<>
            <div className="Box">
                <Book input={item}/>
                {item.requestId?
            <AcceptDeclineRecommendationButton string={item.requestId}/>: null}
            </div>
 
            </>))}

            </>)       }
    
}