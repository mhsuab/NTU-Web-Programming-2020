import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question
  const [currentAns, setCurrentAns] = useState(0)

  const next = async () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    if (current_question < contents.length - 1) {
      choose();
      setCurrentAns(0);
      setCurrentQuestion(current_question + 1);
    }
    else {
      choose();
      setCurrentAns(-1);
    }
  }

  const choose = () => {
    // TODO : update 'ans' for the option you clicked
    setAns([...ans, currentAns]);
  }

  const getQuestions = async () => {
    // TODO : get questions from backend
    // const questions = async () => {
    //   const { data : {msg} } = await instance.get('/getContents')
    // }
    // console.log(msg);
    const { data : {contents} } = await instance.get('/getContents');
    setContents(contents);
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  useEffect(() => {
    if (currentAns === -1) {
      const submitAns = async () => {
        const { data : {score} } = await instance.post('/checkAns', ans);
        setScore(score);
        setComplete(true);
      }
      submitAns();
    }
  }, [currentAns])

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {contents[current_question].questionID} of {contents.length}
            </div>
          </div>
          {complete?
            <React.Fragment>
              <div id="question-title">
                {`Your Score : ${score} / ${contents.length}`}
              </div>
              <div></div>
            </React.Fragment>
            :
            <React.Fragment>
              <div id="question-title">
                {contents[current_question].question}
              </div>
              <div id="options">
                {contents[current_question].options.map((option, idx) => (
                  <div
                    className="each-option"
                    key={`q${contents[current_question].questionID}_${(idx + 1)}`}
                    onClick={() => setCurrentAns(idx + 1)}
                  >
                    <input
                      type="radio"
                      id={`q${contents[current_question].questionID}_${(idx + 1)}`}
                      checked={(idx + 1) === currentAns}
                      readOnly
                    />
                    <span > {option} </span>
                  </div>
                ))}
              </div>
              
              <div id="actions" onClick={next}>
                NEXT
              </div>
            </React.Fragment>
          }
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
