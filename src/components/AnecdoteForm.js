import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const newAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(anecdote));
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