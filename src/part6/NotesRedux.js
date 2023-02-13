import NewNote from '../components/NewNote';
import NoteList from '../components/NoteList';
import VisibilityFilter from '../components/VisibilityFilter';

const NotesRedux = () => (
    <div>
        <NewNote />
        <VisibilityFilter />
        <NoteList />
    </div>
)

export default NotesRedux;