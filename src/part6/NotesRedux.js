import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewNote from '../components/NewNote';
import NoteList from '../components/NoteList';
import VisibilityFilter from '../components/VisibilityFilter';
import { initializeNotes } from '../reducers/noteReducer';

const NotesRedux = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]); // 监听 dispatch 变化是为了消除 eslint 的警告

    return (
        (
            <div>
                <NewNote />
                <VisibilityFilter />
                <NoteList />
            </div>
        )
    );
}

export default NotesRedux;