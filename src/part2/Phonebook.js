import { useState } from "react"

const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [search, setSearch] = useState('');
    const handleSearch = (event) => setSearch(event.target.value);
    const handleAdd = (newPerson) => {
        newPerson['id'] = persons.length + 1;
        setPersons(persons.concat(newPerson));
    }
    const personsToShow = search.length > 0
    ? persons.filter(person => person.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)
    : persons
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter search={search} handleSearch={handleSearch} />
            <h1>add a new</h1>
            <PersonForm handleAdd={handleAdd} />
            <h1>Numbers</h1>
            <Persons persons={personsToShow} />
        </div>
    )
}

const Filter = ({ search, handleSearch }) => (
    <div>
        filter shown with <input value={search} onChange={handleSearch} />
    </div>
)

const PersonForm = ({ handleAdd }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        };
        handleAdd(newPerson);
        setNewName('');
        setNewNumber('');
    }
    return (
        <div>
            <form onSubmit={addPerson}>
                name: <input value={newName} onChange={handleNameChange} />
                number: <input value={newNumber} onChange={handleNumberChange} />
                <button onClick={addPerson}>add</button>
            </form>
        </div>
    );
}

const Persons = ({ persons }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} />
        )}
    </div>
)

const Person = ({ person }) => <p>{person.name} {person.number}</p>

export default Phonebook;