import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAllNotes = () => {
    const request = axios.get(baseUrl);
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    }
    return request.then(res => res.data.concat(nonExisting));
}

const createNote = (note) => {
    const request = axios.post(baseUrl, note);
    return request.then(res => res.data);
}

const updateNote = (id, note) => {
    const request = axios.put(`${baseUrl}/${id}`, note);
    return request.then(res => res.data);
}

export default { getAllNotes, createNote, updateNote }