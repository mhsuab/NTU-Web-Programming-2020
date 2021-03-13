import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [range, setRange] = useState({'lower': 1, 'upper': 100})

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const game = (
    <div>
      {hasWon ? (
        <>
          <p>you won! the number was {number}.</p>
          <button
            onClick={async () => {
              await restart()

              setHasWon(false)
              setStatus('')
              setNumber('')
              setRange({'lower': 1, 'upper': 100})
            }}
          >
            restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between {range["lower"]} to {range["upper"]}</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={async () => {
              let r = await guess(number);
              console.log(r);
              
              if (r === '=') {
                setHasWon(true)
                setStatus('Correct')
              }
              else if (r === '>') {
                setHasWon(false)
                setStatus('Bigger')
                setRange({...range, 'upper': number})
              }
              else {
                setHasWon(false)
                setStatus('Smaller')
                setRange({...range, 'lower': number})
              }
            }}
            disabled={!number}
          >
            guess!
          </button>
          <p>{status}</p>
        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
