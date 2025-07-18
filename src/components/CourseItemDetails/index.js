import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseItem: {}}

  componentDidMount = () => {
    this.getCourseItem()
  }

  getFetchedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getCourseItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = this.getFetchedData(data.course_details)
      this.setState({
        courseItem: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getCourseItem}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourseItem = () => {
    const {courseItem} = this.state
    const {imageUrl, name, description} = courseItem
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderCourseItem()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderView()}
      </>
    )
  }
}

export default CourseItemDetails
