import {useEffect, useState} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const initialState = {
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  loadingView: 'LOADING',
}

export default function Course(props) {
  const {match} = props
  const {params} = match
  const {id} = params

  const ApiURL = `https://apis.ccbp.in/te/courses/${id}`
  console.log(ApiURL)
  const [value, setValue] = useState('')

  const [initialStateView, setInitialStateView] = useState(
    initialState.loadingView,
  )

  const successApiCall = data => {
    const newData = {
      name: data.name,
      id: data.id,
      description: data.description,
      imageUrl: data.image_url,
    }

    setInitialStateView(initialState.successView)
    setValue(newData)
  }

  const failureApiCall = () => {
    setInitialStateView(initialState.failureView)
  }

  const getApiRequest = async () => {
    const response = await fetch(ApiURL)
    const data = await response.json()

    if (response.ok) {
      successApiCall(data.course_details)
    } else {
      failureApiCall()
    }
  }

  useEffect(() => {
    getApiRequest()
  }, [])

  const successView = () => {
    const {name, imageUrl, description} = value
    return (
      <div className="course-card-container">
        <img src={imageUrl} alt={name} className="course-image-element" />
        <div className="course-content">
          <h1 className="course-name">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

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

  const renderTheWebsite = () => {
    switch (initialStateView) {
      case initialState.successView:
        return successView()
      case initialState.failureView:
        return failureView()
      default:
        return loadingView()
    }
  }

  return <div className="course-container">{renderTheWebsite()}</div>
}
