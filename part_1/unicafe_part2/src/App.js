import { useState } from 'react'

// Button Handler
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  );
  }

// StatisticLine Handler including table formatting
const StatisticLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  );
}

// Statistics Calculator
const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const average = ((props.good * 1) + (props.bad * -1) + (props.neutral * 0)) / total
  const positive = props.good / total
  const positive_pct = positive.toLocaleString(undefined, {style: "percent", 
                                                           minimumFractionDigits: 2});

  // Render if feedback is > 0                                                         
  if (total > 0) { 
    return (
      <div>
        <table>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive_pct}/>
        </table>
      </div>
    )
    // No feedback given
    } else {
      return <div>No Feedback given</div>
    }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // click handlers
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  // render the UI
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text = "good" />
      <Button handleClick={handleNeutralClick} text = "neutral" />
      <Button handleClick={handleBadClick} text = "bad" />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App

// Completed 1.11* on 5/8/2023