import React from 'react'

export function Comments(props) {
  
  return (
    <ul className="collection">
      {
        props.listComments.map(comment => {
          return (
            <li key={comment.id} className="collection-comment">
              { comment.id !== 0 
                ? <div className="avatar"><span style={{ background: comment.color}}></span></div>
                : null
              }
              
              <div>{comment.body}</div>
              
            </li>
          )
        })
      }
    </ul>
  )
}