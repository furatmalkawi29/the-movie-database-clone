import React from 'react'
import {Link} from 'react-router-dom'

export const DropdownMenu = ({menuClass, content }) => {

  return (
    <div className={menuClass}>
  {content.map(item => {
    return <div key={item}><Link to={`/${item}`}></Link>{item}</div>
  })
}
    </div>
  )
}
