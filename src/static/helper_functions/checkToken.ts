import logout from "./logout";

export default async function checkToken(token:string, UserContextValues:any){
    let request =  {
      method: "get", 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
    }
    const response = await fetch(`${URL}api/check`,request);
    
    if (!response.ok){

      logout(UserContextValues)
    }
    
  }