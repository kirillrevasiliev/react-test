import React, { useState, useContext } from 'react'
import { Context } from '../context/context'

export function CommentCreator() {
  const [comment, setComment] = useState('')
  const { updateComments } = useContext(Context)

  const createComment = () => {
    setComment()
    const result = updateComments(comment)
    if (result) {
      const str = ''
      setComment(str)
    }
  }

  const onInputComment = value => {
    setComment(value)
  }

  return (
    <div className="comment-creator">
      <input
        type="text"
        placeholder="Write a comment"
        value={comment}
        onChange={event => onInputComment(event.target.value)}
      />

      <button
        onClick={createComment}
        className="btn-submit darken-4"
      >
        <i className="material-icons">keyboard_arrow_right</i>
      </button>
    </div>
  )
}