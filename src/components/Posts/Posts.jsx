import React from 'react'

    const Posts = ({posts, loading}) => {
    if(loading) {
        return <div> Loading... </div>
    }
  return (
    <div className='list-group'>
        {posts.map(post => (
        <div key={post.idClie} className='list-group-item'>
            <div><span className='item-tag'>Nombre:</span>{post.name}</div>
            <div><span className='item-tag'>Id:</span>{post.idClie}</div>
        </div>
        ))}
    </div>
  )
}

export default Posts
