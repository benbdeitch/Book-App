import  { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'

import BookSearchForm from '../forms/BookSearchForm'


export default function BookSearchResultsPage( ) {
    let completed = false;

    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log('Displaying books')
      if (!user.username) navigate('/')

    }, [completed])
    
  return (
    <>
    <BookSearchForm/>

    </>
)
}