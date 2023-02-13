import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/noticeReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.textFilter.length === 0) {
            return state.anecdotes;
        } else {
            return state.anecdotes.filter(item => item.content.toLowerCase().indexOf(state.textFilter.toLowerCase()) !== -1);
        }
    })

    const vote = (id) => {
        dispatch(voteAnecdote(id));
        const anecdote = anecdotes.find(item => item.id === id);
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000));
    }

    return (
        <div>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnecdoteList;