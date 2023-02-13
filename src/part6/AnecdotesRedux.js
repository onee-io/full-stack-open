import AnecdoteForm from '../components/AnecdoteForm';
import AnecdoteList from '../components/AnecdoteList';
import Notice from '../components/Notice';
import TextFilter from '../components/TextFilter';

const AnecdotesRedux = () => (
    <div>
        <h2>Anecdotes</h2>
        <Notice />
        <TextFilter />
        <AnecdoteList />
        <AnecdoteForm />
    </div>
)

export default AnecdotesRedux;