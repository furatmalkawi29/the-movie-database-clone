import React from 'react'
import {Link} from 'react-router-dom'

export const DropdownMenu = ({menuClass, content }) => {

  return (
    <div className={menuClass}>
  {content.map(element => {
    return <div key={element}><Link to={element.split(',')[1]}>{element.split(',')[0]}</Link></div>
  })
}
    </div>
  )
}
