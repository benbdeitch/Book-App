import  { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'
import { Spinner } from 'react-bootstrap'
import Book from '../components/Book'
import History_Add_Button from '../buttons/History_Add_Button'
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