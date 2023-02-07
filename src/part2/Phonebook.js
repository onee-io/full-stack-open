import { useEffect, useState } from "react";
import personService from '../services/phonebook';

const Phonebook = () => {
    const [persons, setPersons] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        personService.getAllPerons().then(allPersons => {
            setPersons(allPersons);
        });
    }, []);

    const handleSearch = (event) => setSearch(event.target.value);
    const handleAdd = (newPerson) => {
        const person = persons.find(item => item.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase());
        if (person) {
            // 联系人已存在，覆盖更新
            const isConfirmed = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);
            if (isConfirmed) {
                personService.updatePerson(person.id, newPerson).then(updatedPerson => {
                    setPersons(persons.map(item => item.id !== person.id ? item : updatedPerson));
                });
            }
        } else {
            // 联系人不存在，新增
            personService.createPerson(newPerson).then(createdPerson => {
                setPersons(persons.concat(createdPerson));
            });
        }
    }
    const handleDelete = (person) => {
        const isConfirmed = window.confirm(`Delete ${person.name}`);
        if (isConfirmed) {
            personService.deletePerson(person.id).then(() => {
                setPersons(persons.filter(item => item.id !== person.id));
            });
        }
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
            <Persons persons={personsToShow} toggleDelete={handleDelete} />
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

const Persons = ({ persons, toggleDelete }) => (
    <div>
        {persons.map(person =>
            <p key={person.id}>{person.name} {person.number} <button onClick={() => toggleDelete(person)}>delete</button></p>
        )}
    </div>
)


export default Phonebook;