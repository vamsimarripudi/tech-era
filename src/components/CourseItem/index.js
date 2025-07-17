import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {details} = props
  const {logoUrl, name, id} = details

  return (
    <Link to={`/courses/${id}`}>
      <li className="listed-type">
        <img src={logoUrl} alt={name} />
        <p className="para">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
