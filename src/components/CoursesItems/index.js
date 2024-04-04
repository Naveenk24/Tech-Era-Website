import {Link} from 'react-router-dom'

import './index.css'

export default function CoursesItems(props) {
  const {coursesDetails} = props
  const {id, logoUrl, name} = coursesDetails
  return (
    <Link to={`courses/${id}`} className="link-tag">
      <li className="list-items">
        <img src={logoUrl} alt={name} className="logo-element" />
        <p className="logo-name">{name}</p>
      </li>
    </Link>
  )
}
