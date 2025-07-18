import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseList: []}

  componentDidMount = () => {
    this.getCourseData()
  }

  getFetchedData = data => ({
    id: data.id,
    name: data.name,
    logoUrl: data.logo_url,
  })

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachItem =>
        this.getFetchedData(eachItem),
      )
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourse = () => {
    const {courseList} = this.state

    return (
      <div>
        <h1>Courses</h1>

        <ul className="unOrder-list">
          {courseList.map(each => (
            <CourseItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getCourseData}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViewStages = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderCourse()
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
        {this.renderViewStages()}
      </>
    )
  }
}

export default Home
