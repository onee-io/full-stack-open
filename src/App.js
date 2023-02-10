import { useEffect, useRef, useState } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';
import Togglable from "./components/Togglable";
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null); 
    // 通知控制
    const showErrorMessage = (_message) => {
        setErrorMessage(_message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    }
    // 加载笔记列表
    useEffect(() => {
        noteService.getAllNotes().then(notes => {
            setNotes(notes);
        });
    }, []);
    // 加载用户信息
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);
    // 处理登录事件
    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
            noteService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            showErrorMessage('Wrong credentials');
        }
    }
    // 切换笔记是否重要
    const toggleImportanceOf = async id => {
        const note = notes.find(item => item.id === id);
        const updateNote = { ...note, important: !note.important };
        try {
            const updatedNote = await noteService.updateNote(id, updateNote);
            setNotes(notes.map(item => item.id !== id ? item : updatedNote));
        } catch (error) {
            showErrorMessage(`the note '${note.content}' was already deleted from server`);
            setNotes(notes.filter(item => item.id !== id));
        }
    }
    // 过滤待展示的笔记
    const notesToShow = showAll ? notes : notes.filter(note => note.important);
    // 创建组件引用
    const noteFormRef = useRef();
    // 处理笔记创建事件
    const addNote = async (noteObject) => {
        noteFormRef.current.toggleVisibility(); // 触发组件显隐
        const returnedNote = await noteService.createNote(noteObject);
        setNotes(notes.concat(returnedNote));
    }
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} isSuccess={false} />
            {user === null
                ? <LoginForm handleLogin={handleLogin} />
                : <div>
                    <p>{user.name} logged-in</p>
                    {
                        <Togglable buttonLabel='new note' ref={noteFormRef}>
                            <NoteForm createNote={addNote} />
                        </Togglable>
                    }
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
