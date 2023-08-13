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
    string:string,
}

interface Book{
    author?:string; 
    googleId:string;
    publishDate?:string;
    image?: string;
    rating?:number; 
    review?:string;
    title: string;
}

interface BookProperty{
    input:Book;
}

interface Form{
    form:JSX.Element;
}