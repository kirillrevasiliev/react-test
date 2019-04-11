import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios/axios-helper'

export function ItemCreator(props) {

  const [inputTitle, setInputTitle] = useState('')

  const setItemTitle = event => {
    event.preventDefault()
    setInputTitle(event.target.value)
  }

  const createItem = () => {
    if (inputTitle !== '') {
      createResult({ title: inputTitle })
    }
  }

  const createResult = async title => {
    const response = await axios.post('items.json', title)
    if (response.data.name) {
      props.history.push(`/item/${response.data.name}`)
    }
  }

  return (
    <div>
      <header className="darken-blue header-wrapper">
        <div className="container">
          <div className="header-container">
            <Link
              to={"/"}
              className="btn-link"
            >
              <i className="material-icons">keyboard_backspace</i>
            </Link>
            <div className="title-wrapper">
              Create new item
            </div>
          </div>
        </div>
      </header>
      <div className="container">
          <div className="input-container">
            <input
              type="text"
              placeholder="New item title"
              value={inputTitle}
              onChange={event => setItemTitle(event)}
            />
            <button
              onClick={createItem}
              className="btn-submit"
            >
            <i className="material-icons">chevron_right</i>
            </button>
        </div>
      </div>
    </div>
  )
}