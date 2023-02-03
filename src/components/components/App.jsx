import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm, ContactList, Filter } from '.';

const LS_KEY = 'contacts';

const App = () => {
  const dataFromLS = JSON.parse(localStorage[LS_KEY]);
  const [contacts, setContacts] = useState(dataFromLS ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const checkedDupliteName = value =>
    contacts.some(
      ({ name }) => name.toLowerCase() === value.name.toLowerCase()
    );

  const addContactToContactBook = contact => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    checkedDupliteName(contact)
      ? alert(`${contact.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

  const deleteContactFromContactBook = id => {
    const bookWithoutDeletedContact = contacts.filter(
      contact => contact.id !== id
    );

    setContacts(bookWithoutDeletedContact);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const visibleFilter = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h2>Phonebook</h2>
      <ContactForm addContact={addContactToContactBook} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={visibleFilter}
        deleteContact={deleteContactFromContactBook}
      />
    </div>
  );
};

export default App;
