import React, { useContext } from 'react'
import { Context } from '../context/context'
import { Link } from 'react-router-dom'

export function ListItem(props) {

  const { deleteItem, showBtnDelete } = useContext(Context)

  const renderList = listItems => {
    if (listItems.length !== 0) {
      return listItems.map((item, index) => {
        const cls = item.show ? "btn-wrapper show-button" : "btn-wrapper"
        
        return (
          <li
            key={index}
            className="collection-item"
          >
            {
              item.comments !== null
                ? <Link
                  to={'/item/' + item.id}
                  className="item-title"
                >
                  {item.title}
                </Link>
                : <div className="item-title">{item.title}</div>
              }
            {
              item.comments !== null
                ? <div className={cls} onClick={id => showBtnDelete(item.id)}>
                  <div className="comments-count">
                    {item.comments}
                  </div>
                  <button
                    className="invisible-item darken-red"
                    onClick={(id) => deleteItem(item.id)}
                  >
                    Delete
                    </button>
                </div>
                : null
            }
          </li>
        )
      })
    } else {
      return (
        <div className="preloader"></div>
      )
    }
  }
  return (
    <ul className="collection">
      {renderList(props.listItems)}
    </ul>
  )
}