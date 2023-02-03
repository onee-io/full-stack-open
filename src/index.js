import React from 'react';
import ReactDOM from 'react-dom/client';
import Anecdotes from './part1/Anecdotes';
import App from './App';
import Unicafe from './part1/Unicafe';
import Course from './part2/Course';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// Part1
// ReactDOM.createRoot(document.getElementById('root')).render(<Unicafe />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Anecdotes />)

// Part2
ReactDOM.createRoot(document.getElementById('root')).render(<Course />)