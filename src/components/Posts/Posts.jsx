import React from 'react'

    const Posts = ({posts, loading}) => {
    if(loading) {
        return <div> Loading... </div>
    }
  return (
    <ul>
        {posts.map(post => (
        <li key={post.id_clie} className='list-group-item'>
            {post.name}
        </li>
        ))}
    </ul>
  )
}

export default Posts
