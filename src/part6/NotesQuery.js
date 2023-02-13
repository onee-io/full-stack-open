import { useMutation, useQuery, useQueryClient } from "react-query"
import { createNote, getNotes, updateNote } from "../services/requests"


const NotesQuery = () => {
    const queryClient = useQueryClient();
    const result = useQuery('notes', getNotes, {
        refetchOnWindowFocus: false
    });
    console.log(result)
    const newNoteMutation = useMutation(createNote, {
        onSuccess: (newNote) => {
            const notes = queryClient.getQueriesData('notes');
            queryClient.setQueriesData('notes', notes.concat(newNote));
        }
    });
    const updateNoteMutation = useMutation(updateNote, {
        onSuccess: () => {
            queryClient.invalidateQueries('notes');
        }
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        console.log(content)
        newNoteMutation.mutate({ content, important: true });
    }

    const toggleImportance = (note) => {
        console.log('toggle importance of', note.id)
    }

    const notes = result.data;

    return (
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map(note =>
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content}
                    <strong> {note.important ? 'important' : ''}</strong>
                </li>
            )}
        </div>
    )
}

export default NotesQuery;