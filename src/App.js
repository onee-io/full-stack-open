import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAllNotes().then(notes => {
      setNotes(notes);
    });
  }, []);

  const handleNoteChange = (event) => setNewNote(event.target.value);

  const toggleImportanceOf = (id) => {
    const note = notes.find(item => item.id === id);
    const updateNote = { ...note, important: !note.important };
    noteService.updateNote(id, updateNote).then(updatedNote => {
      setNotes(notes.map(item => item.id !== id ? item : updatedNote));
    }).catch(error => {
      alert(`the note '${note.content}' was already deleted from server`);
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
    });
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button onClick={addNote}>save</button>
      </form>
    </div>
  )
}

export default App;
