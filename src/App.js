import { useState } from "react"

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'));
    setLeft(left + 1);
  }
  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'));
    setRight(right + 1);
  }

  // const handlePlus = () => setCounter(counter + 1)
  // const handleMinus = () => setCounter(counter - 1)
  // const handleReset = () => setCounter(0)

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]
  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      {/* <Display counter={counter} />
      <Button text='plus' onClick={handlePlus} />
      <Button text='reset' onClick={handleReset} />
      <Button text='minus' onClick={handleMinus} /> */}
      {/* <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
      <button onClick={handleReset}>
        reset
      </button> */}
      {/* <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} /> */}
    </div>
  )
}

// const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        this app is used bu pressing the button
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course}</h1>
//     </div>
//   )
// }

// const Content = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
//       <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
//       <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
//     </div>
//   )
// }

// const Total = (props) => {
//   let total = 0;
//   props.parts.forEach(part => {
//     total += part.exercises;
//   })
//   return (
//     <div>
//       <p>Number of exercises {total}</p>
//     </div>
//   )
// }

// const Part = (props) => {
//   return (
//     <div>
//       <p>{props.part} {props.exercises}</p>
//     </div>
//   )
// }

export default App;
