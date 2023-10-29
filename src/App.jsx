import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from "./components/Die"
import Stats from "./components/Stats"
import Scores from "./components/Scores"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  // rolls
  const [rolls, setRolls] = useState(0);
  // initialize the best rolls state with whats saved in localStorage
  // use lazy state
  const [bestRolls, setBestRolls] = useState(
    () => JSON.parse(localStorage.getItem("bestRolls") || 0)
  )

  // every time bestRolls changes we need to make sure to save it
  // in our local storage
  useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls]);

  // timer
  const [time, setTime] = useState(0);
  // initialize the best time state with whats saved in localStorage
  // use lazy state
  const [bestTime, setBestTime] = useState(
    () => JSON.parse(localStorage.getItem("bestTime") || 0)
  )

  // increments our timer
  useEffect(() => {
    let timer;
    if (!tenzies) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [tenzies])

  // every time bestTime changes we need to make sure to save it
  // in our local storage
  useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);

  // sync 2 different states together
  useEffect(() => {
    // checks if every die isHeld property is true
    const allDiceHeld = dice.every(die => die.isHeld);
    // check if all dice share same value
    const allHaveSameValue = dice.every(die => die.value === dice[0].value)
    if (allDiceHeld && allHaveSameValue) {
      setTenzies(true)
    }
  }, [dice])

  // when tenzies state changes we set our bestRolls and bestTimes
  useEffect(() => {
    if (tenzies) {
      if (!bestRolls || rolls < bestRolls) {
        setBestRolls(rolls);
      }

      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    }
  }, [tenzies])
  
  function generateRandomDieValue() {
    return Math.ceil(Math.random() * 6)
  }

  function generateNewDice() {
    return {
      id: nanoid(),
      value: generateRandomDieValue(),
      isHeld: false,
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice;
  }
  
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => 
        die.isHeld ? 
        die : 
        generateNewDice()
      ))
      setRolls(oldRolls => oldRolls + 1)
    } else {
      reset()
    }
  }

  function reset() {
    setTenzies(false)
    setDice(allNewDice())
    setRolls(0)
    setTime(0);
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die
    ))
  } 

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  const diceElements = dice.map(die => {
    return (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
      />
    )
  })

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">TENZIES</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Stats 
        rolls={rolls}
        time={formatTime(time)}
      />
      <div className="die--container">
        {diceElements}
      </div>
      <Scores 
        bestRolls={bestRolls}
        bestTime={formatTime(bestTime)}
      />
      <button className="roll--btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
