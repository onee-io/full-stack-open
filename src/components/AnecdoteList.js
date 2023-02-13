import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.textFilter.length === 0) {
            return state.anecdotes;
        } else {
            return state.anecdotes.filter(item => item.content.toLowerCase().indexOf(state.textFilter.toLowerCase()) !== -1);
        }
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch({
            type: 'anecdotes/vote',
            id
        });
        const anecdote = anecdotes.find(item => item.id === id);
        dispatch({
            type: 'notice/alertNotice',
            message: `you voted '${anecdote.content}'`
        });
        setTimeout(() => {
            dispatch({
                type: 'notice/clearNotice'
            });
        }, 5000);
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