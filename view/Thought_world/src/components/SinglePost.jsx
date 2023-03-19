import "../styles/posts.css"
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { fetchUsers } from '../redux/registration/action.register'
import $ from 'jquery';
import { handleDeletePost, SinglePostHandler } from '../redux/addPostReducer/action.addPost'
import { AddComment, getComments } from '../redux/comments/action.comment'
import { Card1 } from './card1'
import { Card2 } from './Card2'

export const SinglePost = () => {
  const {id} = useParams('id')
  const dispatch = useDispatch()
  const {activeUser, users, comments, singlePost} = useSelector((store) => {
    return {
        users: store.reducer.users,
        activeUser : store.Loginreducer.activeUser,
        comments: store.commentReducer.comments,
        singlePost: store.AddPostreducer.singlePost
    }
},shallowEqual)

const DeletePost = () =>{
    dispatch(handleDeletePost(id))
}

useEffect(() => {
    dispatch(getComments)
    dispatch(fetchUsers)
    dispatch(SinglePostHandler(id))
},[location.search])

  return (
    <div className="SingleMain">
        <Card1 activeUser={activeUser} users={users} singlePost={singlePost} id={id} />
        <Card2  users={users} singlePost={singlePost} id={id} activeUser={activeUser} DeletePost={DeletePost} />    
    </div>
  )
}
