import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notification, setNotification] = useState(null);

  // Generate a unique ID for new persons
  const generateUniqueId = () => {
    const maxId =
      persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
    return maxId + 1;
  };

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // Clear notification after 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

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
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        const confirmReplace = window.confirm(
          `${newName} is already added to the phonebook with the same number. Replace the old number with a new one?`
        );

        if (!confirmReplace) {
          // User chose not to replace the number, so we return without updating.
          return;
        }
      }

      const updatedPerson = { ...existingPerson, number: newNumber };
      personsService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          setNewName("");
          setNewNumber("");
          // Update filteredPersons with the updated person
          setFilteredPersons(
            filteredPersons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
        });
    } else {
      // Create a new person object with the new name and number
      const personObject = {
        name: newName,
        number: newNumber,
        id: generateUniqueId(),
      };
      personsService.create(personObject).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName("");
        setNewNumber("");
        setNotification({
          message: `Added ${returnedNote.name}`,
          type: "success",
        });
        // Update filteredPersons with the newly added person
        setFilteredPersons([...filteredPersons, returnedNote]);
      });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredPersons(
            filteredPersons.filter((person) => person.id !== id)
          );
          setNotification({
            message: `Deleted ${person.name}`,
            type: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setNotification({
            message: "Failed to delete person",
            type: "error",
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
        {filteredPersons.map((personItem) => (
          <Person
            key={personItem.id}
            person={personItem}
            removePerson={removePerson}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
