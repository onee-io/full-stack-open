import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

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
    const config = {
        headers: { Authorization: token }
    };
    const request = axios.post(baseUrl, note, config);
    return request.then(res => res.data);
}

const updateNote = (id, note) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.put(`${baseUrl}/${id}`, note, config);
    return request.then(res => res.data);
}

export default { setToken, getAllNotes, createNote, updateNote }