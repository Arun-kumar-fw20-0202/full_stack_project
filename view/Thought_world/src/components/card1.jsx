import React from 'react'
import { Link } from 'react-router-dom'
import { CountPostLikes } from './CountPostLikes'
import { LoadSaved } from './LoadSaved'

export const Card1 = ({singlePost,id}) => {
  return (
    <div className="card">
            <div className="content">
                <img src={singlePost.imageUrl} width="120px" alt="" />
            </div>
            <div className="likes">
                <CountPostLikes postId={id} />
                {/*  */}
                <Link><i className='fa fa-send-o'></i></Link>
                {/*  */}
                <Link to={`/post/${id}`}><i className='fa fa-comment-o'></i></Link>
                <LoadSaved postId={id} />
            </div>
            <span>katill :  {singlePost.title}</span>
        </div>
  )
}
