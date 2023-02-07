import { useEffect, useState } from "react";
import axios from 'axios';
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios.get('http://127.0.0.1:3001/notes').then(res => {
      console.log('resolved');
      setNotes(res.data)
    });
  }, []);

  const handleNoteChange = (event) => setNewNote(event.target.value);

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };
    setNotes(notes.concat(newObject));
    setNewNote('');
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
          <Note key={note.id} note={note} />
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
