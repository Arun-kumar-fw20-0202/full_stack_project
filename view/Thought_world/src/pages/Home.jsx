import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { LoadPost } from '../components/LoadPost'
import { handleGetPost } from '../redux/addPostReducer/action.addPost'
import "../styles/posts.css"

export const Home = () => {
  const location = useLocation()
  const dispatch = useDispatch()
    const {activeUser,posts} = useSelector((store) => {
        return {
            activeUser: store.Loginreducer.activeUser,
            posts: store.AddPostreducer.posts
        }
    },shallowEqual)


  useEffect(() => {
    dispatch(handleGetPost)
  },[location.search])
 
  return (
    <>
      <div className="storySideBr">
      <div className="storys">
          <img src="https://i.ibb.co/vLtyHzg/IMG-20230211-WA0022.jpg" alt="" />
          <h1>+</h1>
        </div>
        <div className="storys">
          <img src="https://i.ibb.co/vLtyHzg/IMG-20230211-WA0022.jpg" alt="" />
        </div>
      </div>
      <div className='AllCards'>
        {posts && posts.map((ele,i) => (
          <LoadPost key={i} {...ele} />
          ))}
      </div>
    </>
  )
}
