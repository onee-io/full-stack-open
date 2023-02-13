import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import Anecdotes from './part1/Anecdotes';
import App from './App';
import Unicafe from './part1/Unicafe';
import Course from './part2/Course';
import Phonebook from './part2/Phonebook';
import Countries from './part2/Countries';
import Blogs from './part5/Blogs';
import AnecdotesRedux from './part6/AnecdotesRedux';
import NotesRedux from './part6/NotesRedux';

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
//         <NotesRedux />
//     </Provider>
// )
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AnecdotesRedux />
    </Provider>
)