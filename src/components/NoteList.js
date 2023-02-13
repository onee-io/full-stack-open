import { useDispatch, useSelector } from "react-redux";

const NoteList = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.notes
        }
        return state.filter === 'IMPORTANT'
            ? state.notes.filter(note => note.important)
            : state.notes.filter(note => !note.important)
    })
    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch({
                        type: 'notes/toggleImportanceOf',
                        id: note.id
                    })}
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

export default NoteList;