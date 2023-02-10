import { useEffect, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService.getAllNotes().then(notes => {
            setNotes(notes);
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const handleNoteChange = (event) => setNewNote(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(item => item.id === id);
        const updateNote = { ...note, important: !note.important };
        noteService.updateNote(id, updateNote).then(updatedNote => {
            setNotes(notes.map(item => item.id !== id ? item : updatedNote));
        }).catch(error => {
            setErrorMessage(`the note '${note.content}' was already deleted from server`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            setNotes(notes.filter(item => item.id !== id));
        });
    }

    const addNote = (event) => {
        event.preventDefault();
        const newObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        };
        noteService.createNote(newObject).then(note => {
            setNotes(notes.concat(note));
            setNewNote('');
        }).catch(error => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        });
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button onClick={addNote}>save</button>
        </form>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} isSuccess={false} />
            {user === null
                ? loginForm()
                : <div>
                    <p>{user.name} logged-in</p>
                    {noteForm()}
                </div>
            }
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <Footer />
        </div>
    )
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    };
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}

export default App;
