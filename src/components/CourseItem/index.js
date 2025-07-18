import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {details} = props
  const {logoUrl, name, id} = details

  return (
    <li className="listed-type">
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p className="para">{name}</p>
      </Link>
    </li>
  )
}

export default CourseItem
