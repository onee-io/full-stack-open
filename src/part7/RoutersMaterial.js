import { useState } from 'react';

import {
    BrowserRouter as Router, Link,
    Navigate, Route, Routes, useNavigate, useParams
} from "react-router-dom";

import { Alert, AppBar, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Toolbar } from '@mui/material';


const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

const Note = ({ notes }) => {
    const id = useParams().id
    const note = notes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {notes.map(note => (
                        <TableRow key={note.id}>
                            <TableCell>
                                <Link to={`/notes/${note.id}`}>{note.content}</Link>
                            </TableCell>
                            <TableCell>
                                {note.user}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField label="username" />
                </div>
                <div>
                    <TextField label="password" type='password' />
                </div>
                <Button variant="contained" color="primary" type="submit">login</Button>
            </form>
        </div>
    )
}

const RoutersMaterial = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const login = (user) => {
        setUser(user)
        setMessage(`welcome ${user}`)
        setTimeout(() => {
            setMessage(null)
        }, 10000)
    }

    const padding = {
        padding: 5
    }

    return (
        <Container>
            {(message &&
                <Alert severity="success">
                    {message}
                </Alert>
            )}
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            home
                        </Button>
                        <Button color="inherit" component={Link} to="/notes">
                            notes
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            users
                        </Button>
                        {user
                            ? <em>{user} logged in</em>
                            : <Button color="inherit" component={Link} to="/login">
                                login
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/notes">notes</Link>
                    <Link style={padding} to="/users">users</Link>
                    {user
                        ? <em>{user} logged in</em>
                        : <Link style={padding} to="/login">login</Link>
                    }
                </div>

                <Routes>
                    <Route path="/notes/:id" element={<Note notes={notes} />} />
                    <Route path="/notes" element={<Notes notes={notes} />} />
                    <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
            <div>
                <br />
                <em>Note app, Department of Computer Science 2023</em>
            </div>
        </Container>
    )
}

export default RoutersMaterial;