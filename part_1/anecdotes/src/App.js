import { useState } from 'react'

// Button Handler
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  );
  }
// Anecdotes
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  // Selected/Votes
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState({0: 0,
                                      1: 0,
                                      2: 0,
                                      3: 0,
                                      4: 0,
                                      5: 0,
                                      6: 0,
                                      7: 0})

  // Click Handler
  const handleClick = () => {
    const random_int = Math.floor(Math.random() *7)
    setSelected(random_int)
  }
  // Vote Handler
  const handleVote = () => {
    const updatedState = {...votes}
    updatedState[selected] +=1;
    setVotes(updatedState);
  }

  // Get key of Anecdote with most votes
  const maxAnecdote = (votes) => {
    let maxValue = 0;
    let maxKey = 1;
    for (const [key, value] of Object.entries(votes)) {
        if(value > maxValue) {
          maxValue = value;
          maxKey = key
        }
    }
    return maxKey
}


// Anecdotes
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} 
      <br></br>
      has {votes[selected]} votes.
      <br></br>
      <Button handleClick={handleVote} text= "vote"/>
      <Button handleClick={handleClick} text = "next anecdote" />
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxAnecdote(votes)]}
      <br></br> 
      has {votes[maxAnecdote(votes)]} votes.
      
      
    </div>
  )
}

export default App
// Complete 7/2/2023