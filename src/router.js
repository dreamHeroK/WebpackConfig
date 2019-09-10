import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About"

export default class router extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Router>
    )
  }
}
