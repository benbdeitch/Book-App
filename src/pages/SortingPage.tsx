
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/UserProvider";
import SortingListEntry from "../components/SortingListEntry";
import { useNavigate } from "react-router-dom";
import SortingList from "../components/Sorting_List";
import SortingButton from "../buttons/SortedButton";



export default function SortingPage(){
    const {username, readingList} = useContext(UserContext)
  
    const navigate = useNavigate()
    useEffect(() => {
        
        if (!username)
            { navigate('/')}}), [readingList]


    return(<>
  
    <div className="Box">
    <h1>{username}'s Sorting Page </h1>
    
    </div>
        <SortingButton/>
        <SortingList/>
        
    </>)
}