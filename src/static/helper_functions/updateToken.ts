import { Dispatch, SetStateAction } from "react";

export default function updateToken(json:ObjectOfStrings, setToken:Dispatch<SetStateAction<string>>,){
    if (json.hasOwnProperty("token")){
        setToken(json.token)
    }
}