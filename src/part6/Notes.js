import { toggleImportanceOf } from '../reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from '../components/NewNote'

const Notes = () => {
    return (
        <div>
            <NewNote />
            <NoteList />
        </div>
    )
}

const NoteList = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)
    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch(toggleImportanceOf(note.id))}
                />
            )}
        </ul>
    )
}

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

export default Notes