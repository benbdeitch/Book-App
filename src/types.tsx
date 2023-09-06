interface LoggedUser{
    username: string;
    email:string;
    token: string;
    readingList: ReadingListEntry[];
    recommendations: BookRecommendation[];
    friends: FriendList;
    readingHistory: HistoryEntry[];
    friendRequests: FriendRequest[]
}

interface SearchUserValues{
    state:{
    username:string;
    email:string;
    }

}

interface FriendList{
    [key:string]: Friend
}
interface Friend{
    username: string;
    email:string;
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
    dateAdded?: string;
    priority: number;
}


interface BookRecommendation{
    book:Book,
    message?: string
    from: string
    requestId:string
    dateAdded?: string
}
interface HistoryEntry{
    book:Book;
    rating?:number;
    review?: string;
    date: string
}
interface Book{
    author?:string; 
    googleId:string;
    publishDate?:string;
    image?: string;
    title: string;
}

interface BookProperty{
    book:Book;
}

interface Form{
    form:JSX.Element;
}
