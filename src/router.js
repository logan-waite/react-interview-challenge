import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Favorites from 'src/pages/Favorites'

const AppRouter = () => (
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/favorites' component={Favorites} />
  </Router>
)

export default AppRouter
