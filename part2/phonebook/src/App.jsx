import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  /// handlechange input for filter
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);

    // Update the filteredPersons state based on the filter
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  // handlechange input for name
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // handlechange input for number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Submit form
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(newName + " is already added to phonebook");
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
    // Update filteredPersons with the newly added person
    setFilteredPersons([...filteredPersons, personObject]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
