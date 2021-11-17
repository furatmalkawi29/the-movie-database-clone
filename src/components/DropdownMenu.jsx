import React from 'react'
import {Link} from 'react-router-dom'

export default function DropdownMenu(props) {

  return (
    <div className={props.menuClass}>
  {props.content.map(element => {
    return <div key={element}><Link to={element.split(',')[1]}>{element.split(',')[0]}</Link></div>
  })
}
    </div>
  )
}
