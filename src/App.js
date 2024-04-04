import {Route, Switch, Redirect, Link} from 'react-router-dom'

import Home from './components/Home/index'

import Course from './components/Course/index'

import NotFound from './components/NotFound/index'

import './App.css'

// Replace your code here
const App = () => (
  <div className="bg-container">
    <nav className="nav-element">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png "
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </nav>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={Course} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
