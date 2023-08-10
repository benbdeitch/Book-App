interface LoggedUser{
    username: string;
    token: string
}

interface SearchUserValues{
    state:{
    username:string;
    email:string;
    }

}

interface UserData{
    username: string,
    email: string
}

interface encasedString{
    userSearch:string,
}