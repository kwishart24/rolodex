import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchContacts } from '../../api';

//import { fetchContacts } from '../../api';

function ContactDetails() {
  const { contactId } = useParams();
  console.log(contactId);

  //ContactList
  const [contactList, setContactList] = useState([]);

  //NotesList
  const [notesList, setNotesList] = useState([]);

  // Is loading message
  const [isLoading, setIsLoading] = useState(false);

  // Error Message
  const [errorMessage, setErrorMessage] = useState('');

  //Saving
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchContacts()
      .then((contacts) => {
        setContactList(contacts);
        setIsLoading(false);
        console.log(contacts);
      })
      .catch((error) => console.log(error));
  }, []);

  //get contact info for current contact
  const currentContact = contactList.find((c) => c.contactId === contactId);
  console.log(contactList);

  if (!currentContact) {
    return <p>Loading contact...</p>;
  }

  //get notes for current contact from notes array
  // const contactNotes = notesList.filter((note) => note.contactId === contactId);

  // if (!contactNotes) {
  //   return <p>Add a note!</p>;
  // }

  return (
    <div className="currentContact">
      <img src={currentContact.headshot} />
      <ul>
        <li>
          Name: {`${currentContact.firstName} ${currentContact.lastName}`}
        </li>
        <li>Job Title: {`${currentContact.jobTitle}`}</li>
        <li>Company: {`${currentContact.company}`}</li>
        <li>Email: {`${currentContact.email}`}</li>
        <li>Phone: {`${currentContact.phone}`}</li>
        <li>
          Website: <a>{`${currentContact.website}`}</a>
        </li>
      </ul>
      {/* <h3>Notes</h3>
      <ul>
        {contactNotes.map((note) => (
          <li key={note.noteId}>
            <strong>{note.noteTitle}</strong>
            <p>{note.noteBody}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ContactDetails;
