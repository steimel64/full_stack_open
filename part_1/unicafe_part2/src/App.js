import { useState } from 'react'


const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  
  return (
    <div>
      all {props.good + props.bad + props.neutral}
      average {(props.good * 1 + props.bad * -1 + props.neutral*0) / total}
      positive {props.good / total}
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h2>statistics</h2>
      good {good}
      neutral {neutral}
      bad {bad}
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
