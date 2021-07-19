import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login.js'
import Home from './Home.js'

export default function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login}></Route>
      <Route path="/index/" exact component={Home} ></Route>
    </Router>
  )
}