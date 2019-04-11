import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Comments } from '../components/Comments'
import { CommentCreator } from '../components/CommentCreator'
import { Context } from '../context/context'
import axios from '../axios/axios-helper'

export function ContainerComments(props) {

  const [listComments, setListComments] = useState([])
  const [title, setTitle] = useState('')
  const idItem = props.match.params.id

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    const response = await axios.get(`items/${idItem}.json`)
    if (response.data.title && title === '') {
      setTitle(response.data.title)
    }

    const comments = []
    if (response.data.comments) {
      Object.keys(response.data.comments).forEach((key) => {
        comments.push({
          id: key,
          body: response.data.comments[key].body,
          color: response.data.comments[key].color
        })
      })
      setListComments(comments)
    } else {
      setListComments([{ id: 0, body: 'You have no comments' }])
    }
  }

  const createComment = async body => {
      const response = await axios.post(`items/${idItem}/comments.json`, body)
      if (response.statusText === 'OK') {
        requestData()
        return true
      } else {
        return false
      }
  }

  const updateComments = _comment => {
    const comment = {
      body: _comment,
      color: `#${(Math.random().toString(16) + "000000").substring(2, 8)}`
    }
    return createComment(comment)
  }
  const html = () => {
    if (title !== '') {
      return (
        <Context.Provider value={{ updateComments }}>
          <header className="darken-blue header-wrapper">
           <div className="container">
           <div className="header-container">
                <Link to="/" className="btn-link">
                  <i className="material-icons">keyboard_backspace</i>
                </Link>
                <div className="title-wrapper">{title}</div>
           </div>
              
           </div>
          </header>
          <div className="container">
            <Comments listComments={listComments} />
            <CommentCreator />
          </div>
        </Context.Provider>
      )
    } else {
      return (<div className={'preloader'}></div>)
    }
  }
  return (html())
}