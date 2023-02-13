import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdotesReducer';
import { setNotification } from "../reducers/noticeReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const newAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(content));
        dispatch(setNotification(`'${content}' added`, 5000));
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    );
}

export default AnecdoteForm;