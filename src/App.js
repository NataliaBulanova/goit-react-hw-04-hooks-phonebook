import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onSubmitHandler = ({ name, number }) => {
    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(name + " is already in contacts");
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts((prev) => [contact, ...prev]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        handleClick={deleteContact}
      />
    </div>
  );
};

export default App;
