import ContactItem from 'components/components/ContactList/ContactItem';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          id={id}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};
export default ContactList;
