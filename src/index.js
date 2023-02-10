import React from 'react';
import ReactDOM from 'react-dom/client';
import Anecdotes from './part1/Anecdotes';
import App from './App';
import Unicafe from './part1/Unicafe';
import Course from './part2/Course';
import Phonebook from './part2/Phonebook';
import Countries from './part2/Countries';
import './index.css'
import Blogs from './part5/Blogs';

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// Part1
// ReactDOM.createRoot(document.getElementById('root')).render(<Unicafe />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Anecdotes />)

// Part2
// ReactDOM.createRoot(document.getElementById('root')).render(<Course />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Phonebook />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Countries />)

// Part5
// ReactDOM.createRoot(document.getElementById('root')).render(<Blogs />)