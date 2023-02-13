import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const newAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch({
            type: 'anecdotes/newAnecdote',
            content
        });
        dispatch({
            type: 'notice/alertNotice',
            message: `'${content}' added`
        });
        setTimeout(() => {
            dispatch({
                type: 'notice/clearNotice'
            });
        }, 5000);
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