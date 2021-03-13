import React, { Component } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,    // true if answered all questions
      contents: [],       // to store questions
      ans: [],            // to record your answers
      score: 0,           // Your score
      current_question: 0 // index to current question
    }
  }

  next = () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question    
  }

  choose = () => {
    // TODO : update 'ans' for the option you clicked
  }

  getQuestions = () => {
    // TODO : get questions from backend
  }

  componentDidMount() {
    this.getQuestions()
  }

  // TODO : fill in the rendering contents and logic
  render() {
    const contents = this.state.contents
    const current = this.state.current_question
    const score = this.state.score
    const ans = this.state.ans

    return (
      <div id="quiz-container">
        {contents.length ?
          <React.Fragment>
            <div id="question-box">
              <div className="question-box-inner">

              </div>
            </div>

            <div id="question-title">
              
            </div>

            <div id="options">
              
            </div>
            
            <div id="actions" onClick={this.next}>
              NEXT
            </div>
          </React.Fragment>
          : <React.Fragment></React.Fragment>
        }
      </div>
    )
  }
}

export default Question
