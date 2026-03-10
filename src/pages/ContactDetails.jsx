import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchContacts, fetchNotes, createNote } from '../api.js';
import ContactInfo from '../features/contacts/ContactInfo.jsx';
import Note from '../features/notes/Note.jsx';
import AddNewNote from '../features/notes/AddNewNote.jsx';
import EditContactForm from '../features/contacts/EditContactForm.jsx';

function ContactDetails({
  noteFormData,
  handleNoteChange,
  setNoteFormData,
  isSaving,
  setIsSaving,
  setIsLoading,
  contactFormData,
  handleContactChange,
  handleUpdateContact,
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

      // THIS IS WHERE YOU RESET THE FORM
      setNoteFormData({ noteTitle: '', noteBody: '' });

      // optional: close the form
      setShowNoteForm(false);

      //editing mode back to null
      setEditingMode(null);

      // optional: refresh notes
      fetchNotes().then(setNotesList);
    } finally {
      setIsSaving(false);
    }
  };

  // Error Message
  const [errorMessage, setErrorMessage] = useState('');

  //Editing for either notes or contacts. values include null, {type: "contact"}, and {type: "note", id: noteId}
  const [editingMode, setEditingMode] = useState(null);

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
      <button
        onClick={() =>
          setEditingMode(
            editingMode?.type === 'contact' ? null : { type: 'contact' }
          )
        }
        disabled={editingMode?.type === 'note'}
      >
        {editingMode?.type === 'contact' ? 'Cancel' : 'Edit Contact'}
      </button>
      <EditContactForm
        isSaving={isSaving}
        setIsSaving={setIsSaving}
        contactFormData={contactFormData}
        handleContactChange={handleContactChange}
        handleUpdateContact={handleUpdateContact}
      />
      <h3>Notes</h3>
      <button
        onClick={() => {
          if (editingMode?.type === 'contact') return;
          setShowNoteForm(!showNoteForm);
        }}
        disabled={editingMode?.type === 'contact'}
      >
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
            editingMode={editingMode}
            setEditingMode={setEditingMode}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
            noteFormData={noteFormData}
            handleNoteChange={handleNoteChange}
            handleUpdateNote={handleUpdateNote}
            handleSaveNote={handleSaveNote}
          />
        ))}
      </ul>
    </div>
  );
}

export default ContactDetails;
