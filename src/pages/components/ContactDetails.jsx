import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchContacts, fetchNotes, createNote } from '../../api';
import ContactInfo from './ContactInfo.jsx';
import Note from './Note.jsx';
import AddNewNote from './AddNewNote.jsx';

function ContactDetails({
  noteFormData,
  handleNoteChange,
  setNoteFormData,
  isSaving,
  setIsSaving,
}) {
  const { contactId } = useParams();

  //ContactList
  const [contactList, setContactList] = useState([]);

  //NotesList
  const [notesList, setNotesList] = useState([]);

  //Showing the section to add a new note
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleSaveNote = async () => {
    setIsSaving(true);

    try {
      await createNote({
        ...noteFormData,
        contactId: currentContact.contactId,
      });

      // ⬇️ THIS IS WHERE YOU RESET THE FORM
      setNoteFormData({ noteTitle: '', noteBody: '' });

      // optional: close the form
      setShowNoteForm(false);

      // optional: refresh notes
      fetchNotes().then(setNotesList);
    } finally {
      setIsSaving(false);
    }
  };

  // Is loading message
  const [isLoading, setIsLoading] = useState(false);

  // Error Message
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetchContacts()
      .then((contacts) => {
        setContactList(contacts);
        setIsLoading(false);
        //console.log(contacts);
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
  //console.log(contactNotes);

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
      <button onClick={() => setShowNoteForm(!showNoteForm)}>
        {showNoteForm ? 'Hide Note Form' : 'Add New Note'}
      </button>
      {showNoteForm && (
        <div className="note-form-container">
          <AddNewNote
            noteFormData={noteFormData}
            handleNoteChange={handleNoteChange}
          />
          <button onClick={handleSaveNote} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Note'}
          </button>
        </div>
      )}

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
