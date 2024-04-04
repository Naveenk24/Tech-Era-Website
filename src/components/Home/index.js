import {useEffect, useState} from 'react'

import Loader from 'react-loader-spinner'

import CoursesItems from '../CoursesItems/index'

import './index.css'

const apiURL = 'https://apis.ccbp.in/te/courses'

const initialState = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  loadingView: 'LOADING',
}

export default function Home() {
  const [values, setValues] = useState([])

  const [initialStateView, setInitialStateView] = useState(
    initialState.loadingView,
  )

  console.log(initialStateView)

  const fetchDataSuccess = data => {
    setInitialStateView(initialState.successView)
    const newData = data.courses.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      logoUrl: eachItem.logo_url,
    }))
    setValues(newData)
  }

  const fetchDataFailure = () => {
    setInitialStateView(initialState.failureView)
  }

  const getApiRequest = async () => {
    const response = await fetch(apiURL)
    const data = await response.json()

    if (response.ok) {
      fetchDataSuccess(data)
    } else {
      fetchDataFailure(data)
    }
  }

  useEffect(() => {
    getApiRequest()
  }, [])

  const successView = () => (
    <div className="success-view-container">
      <h1 className="courses-heading">Courses</h1>
      <ul className="tech-content-list">
        {values.map(eachItem => (
          <CoursesItems key={eachItem.id} coursesDetails={eachItem} />
        ))}
      </ul>
    </div>
  )

  const loadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#4656a1" height={50} width={50} />
    </div>
  )

  const ResetTheApiRequest = () => getApiRequest()

  const failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={ResetTheApiRequest}
      >
        Retry
      </button>
    </div>
  )

  const techEraContent = () => {
    switch (initialStateView) {
      case initialState.successView:
        return successView()
      case initialState.failureView:
        return failureView()
      default:
        return loadingView()
    }
  }

  return (
    <>
      <div className="contents-container">{techEraContent()}</div>
    </>
  )
}
