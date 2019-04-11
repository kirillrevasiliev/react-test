import React, { useState, useEffect } from 'react'
import { Context } from '../context/context'
import { Link } from 'react-router-dom'
import { ListItem } from '../components/ListItem'
import axios from '../axios/axios-helper'

export function ContainerMain() {

  const [listItems, setListItems] = useState([])

  useEffect(() => {
    getItem()
  }, [])

  const getItem = async () => {
    const response = await axios.get('items.json')
    const items = []
    if (response.data === null) {
      setListItems([{ key: 0, title: 'You have no items', comments: null }])
    } else {
      Object.keys(response.data).forEach((key) => {
        let count = 0
        if (response.data[key].comments) {
          count = Object.keys(response.data[key].comments).length
        }
        items.push({
          id: key,
          title: response.data[key].title,
          comments: count,
          show: false
        })
      })
      setListItems(items)
    }
  }

  const deleteItem = async _id => {
    const response = await axios.delete(`items/${_id}.json`)
    if (response.statusText === "OK") {
      setListItems(listItems.filter(item => { return item.id !== _id }))
    }
  }

  const showBtnDelete = async _id => {
    setListItems(listItems.map(item => {
      if (item.id === _id) {
        item.show = true
      } else {
        item.show = false
      }
      return item
    }))
  }

  return (
    <Context.Provider value={{ deleteItem, showBtnDelete }}>
      <header className="darken-blue header-wrapper">
        <div className="container">
          <div className="header-title">Sayer</div>
          <span>World's most user time waster</span>
        </div>
      </header>
      <div className="container">
        <ListItem listItems={listItems} />
        <div className="center">
          <Link
            to={'/create-item'}
            className="btn-create darken-red"
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    </Context.Provider>
  )
}