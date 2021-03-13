import React, { Component } from 'react'
// import Question from './Question'
import Question from './Question_hook'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Question />
    )
  }
}

export default App
