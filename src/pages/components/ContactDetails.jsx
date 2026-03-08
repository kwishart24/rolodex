import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchContacts, fetchNotes } from '../../api';
import ContactInfo from './ContactInfo.jsx';
import Note from './Note.jsx';

//import { fetchContacts } from '../../api';

function ContactDetails() {
  const { contactId } = useParams();

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

  //fetch notes
  useEffect(() => {
    setIsLoading(true);

    fetchNotes()
      .then((notes) => {
        setNotesList(notes);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  //get notes for current contact from notes array
  const contactNotes = notesList.filter((note) => note.contactId === contactId);
  console.log(contactNotes);

  if (!currentContact) {
    return <p>Loading contact...</p>;
  }

  if (!contactNotes) {
    return <p>Add a note!</p>;
  }

  return (
    <div className="currentContact">
      <ContactInfo
        key={contactId}
        headshot={currentContact.headshot}
        firstName={currentContact.firstName}
        lastName={currentContact.lastName}
        jobTitle={currentContact.jobTitle}
        company={currentContact.company}
        website={currentContact.website}
        email={currentContact.email}
        phone={currentContact.phone}
        contactId={currentContact.contactId}
      />
      <h3>Notes</h3>
      <ul>
        {contactNotes.map((note) => (
          <Note
            key={note.noteId}
            noteTitle={note.noteTitle}
            noteBody={note.noteBody}
            noteId={note.noteId}
            createdNoteTime={note.createdNoteTime}
          />
        ))}
      </ul>
    </div>
  );
}

export default ContactDetails;
