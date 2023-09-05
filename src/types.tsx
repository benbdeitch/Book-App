interface LoggedUser{
    username: string;
    token: string;
    readingList: ReadingListEntry[];
    recommendations: BookRecommendation[];
    friends: Friend[];
    readingHistory: HistoryEntry[];
    friendRequests: FriendRequest[]
}

interface SearchUserValues{
    state:{
    username:string;
    email:string;
    }

}

interface Friend{
    username: string;
    dateAdded: Date;
    readingHistory: HistoryEntry[],
    readingList: ReadingListEntry[]
}
interface UserData{
    username: string,
    email: string
}

interface encasedString{
    string:string,
}
interface encasedStringArray{
    array:string[]
}

interface FriendRequest{
    from: string,
}
//This format is used for displaying entries in the Reading List, area.
interface ReadingListEntry{
    book:Book;
    from?: string;
    dateAdded?: Date;
    priority: number;
}


interface BookRecommendation{
    book:Book,
    message?: string
    from: string
    requestId:string
    dateAdded?: Date
}
interface HistoryEntry{
    book:Book;
    rating?:number;
    review?: string;
    dateAdded?: Date
}
interface Book{
    author?:string; 
    googleId:string;
    publishDate?:string;
    image?: string;
    title: string;
}

interface BookProperty{
    input:Book;
}

interface Form{
    form:JSX.Element;
}