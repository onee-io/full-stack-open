import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer';
import anecdoteReducer from './reducers/anecdotesReducer'
import './index.css';
import Anecdotes from './part1/Anecdotes';
import App from './App';
import Unicafe from './part1/Unicafe';
import Course from './part2/Course';
import Phonebook from './part2/Phonebook';
import Countries from './part2/Countries';
import Blogs from './part5/Blogs';
import Notes from './part6/Notes';
import AnecdotesRedux from './part6/AnecdotesRedux';

// const store = createStore(noteReducer);
const store = createStore(anecdoteReducer);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// Part1
// ReactDOM.createRoot(document.getElementById('root')).render(<Unicafe />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Anecdotes />)

// Part2
// ReactDOM.createRoot(document.getElementById('root')).render(<Course />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Phonebook />)
// ReactDOM.createRoot(document.getElementById('root')).render(<Countries />)

// Part5
// ReactDOM.createRoot(document.getElementById('root')).render(<Blogs />)

// Part6
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//         <Notes />
//     </Provider>
// )
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AnecdotesRedux />
    </Provider>
)