import { useState } from "react";

const Anecdotes = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
      ]
    
      const [selected, setSelected] = useState(0);
      const [votes, setVotes] = useState([...Array(anecdotes.length)].map(x => 0));

      let maxVotes = 0;
      let maxIndex = 0;
      votes.forEach((value, index) => {
        if (value > maxVotes) {
          maxVotes = value;
          maxIndex = index;
        }
      }) 

      // 随机一个不与上次重复的随机值
      const randomInt = (min, max) => {
        let value = Math.floor(Math.random() * (max + 1 - min) + min);
        if (value === selected) {
            value = randomInt(min, max);
        }
        return value;
      }

      const handleVote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
      }
      const handleNext = () => {
        setSelected(randomInt(0, anecdotes.length - 1));
      }
    
      return (
        <div>
          <h1>Anecdote of the day</h1>
          <div>{anecdotes[selected]}</div>
          <div>has {votes[selected]} votes</div>
          <Button onClick={handleVote} text='vote' />
          <Button onClick={handleNext} text='next anecdote' />
          <h1>Anecdote with most</h1>
          <div>{anecdotes[maxIndex]}</div>
          <div>has {votes[maxIndex]} votes</div>
        </div>
      )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

export default Anecdotes;