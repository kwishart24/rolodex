import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchNotes, createNote, updateNote } from '../api.js';
import ContactInfo from '../features/contacts/ContactInfo.jsx';
import Note from '../features/notes/Note.jsx';
import NoteForm from '../features/notes/NoteForm.jsx';
import ContactForm from '../features/contacts/ContactForm.jsx';
import { uploadHeadshot } from '../upload.js';

function ContactDetails({
  noteFormData,
  handleNoteChange,
  setNoteFormData,
  isSaving,
  setIsSaving,
  setIsLoading,
  contactFormData,
  setContactFormData,
  handleContactChange,
  handleFileChange,
  contactList,
  updateContactInAirtable,
  headshotFile,
  setHeadshotFile,
  errorMessage,
  setErrorMessage,
}) {
  const { contactId } = useParams();

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

  //submit handler for saving contact
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    // Validation: require first OR last name
    if (!contactFormData.firstName.trim() && !contactFormData.lastName.trim()) {
      setErrorMessage('Please enter at least a first name or a last name.');
      setIsSaving(false);
      return;
    }

    try {
      let headshotUrl = currentContact.headshot;

      //if user selected a new file, upload it
      if (headshotFile) {
        headshotUrl = await uploadHeadshot(headshotFile);
      }

      await updateContactInAirtable(currentContact.contactId, {
        ...contactFormData,
        headshot: headshotUrl
          ? [{ url: headshotUrl }]
          : currentContact.headshot || [],
      });

      setEditingMode(null);
      setHeadshotFile(null);
    } finally {
      setIsSaving(false);
    }
  };

  //when note is updated
  const handleUpdateNote = async (noteId) => {
    setIsSaving(true);

    try {
      await updateNote(noteId, {
        noteTitle: noteFormData.noteTitle,
        noteBody: noteFormData.noteBody,
      });

      // Refresh notes
      const updatedNotes = await fetchNotes();
      setNotesList(updatedNotes);

      // Exit edit mode
      setEditingMode(null);

      // Clear form
      setNoteFormData({ noteTitle: '', noteBody: '' });
    } finally {
      setIsSaving(false);
    }
  };

  //Editing for either notes or contacts. values include null, {type: "contact"}, and {type: "note", id: noteId}
  const [editingMode, setEditingMode] = useState(null);

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

  //preload form when entering edit mode
  useEffect(() => {
    if (editingMode?.type === 'contact' && currentContact) {
      setContactFormData({
        firstName: currentContact.firstName || '',
        lastName: currentContact.lastName || '',
        phone: currentContact.phone || '',
        email: currentContact.email || '',
        jobTitle: currentContact.jobTitle || '',
        company: currentContact.company || '',
        website: currentContact.website || '',
      });
    }
  }, [editingMode, currentContact, setContactFormData]);

  //add new note closes when user clicks to edit individual note
  useEffect(() => {
    if (editingMode !== null) {
      setShowNoteForm(false);
    }
  }, [editingMode]);

  if (!currentContact) {
    return <p>Loading contact...</p>;
  }

  if (!contactNotes) {
    return <p>Add a note!</p>;
  }

  const isEditingThisContact =
    editingMode?.type === 'contact' && editingMode?.id === contactId;

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
            isEditingThisContact ? null : { type: 'contact', id: contactId }
          )
        }
        disabled={editingMode?.type === 'note'}
      >
        {isEditingThisContact ? 'Cancel' : 'Edit Contact'}
      </button>

      {/* Contact edit form */}
      {isEditingThisContact && (
        <div className="contact-edit-form">
          <ContactForm
            isSaving={isSaving}
            setIsSaving={setIsSaving}
            contactFormData={contactFormData}
            handleContactChange={handleContactChange}
            handleFileChange={handleFileChange}
            errorMessage={errorMessage}
          />
          <button onClick={handleUpdateContact} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      )}

      <h3>Notes</h3>
      {/* add new note button */}
      <button
        onClick={() => {
          if (editingMode !== null) return;
          setShowNoteForm(!showNoteForm);
        }}
        disabled={editingMode !== null}
      >
        {showNoteForm ? 'Hide Note Form' : 'Add New Note'}
      </button>

      {/* add new note form */}
      {showNoteForm && (
        <div className="note-form-container">
          <NoteForm
            noteFormData={noteFormData}
            handleNoteChange={handleNoteChange}
          />
          <button onClick={handleSaveNote} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Note'}
          </button>
        </div>
      )}

      {/* existing notes */}
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
            handleSaveNote={handleSaveNote}
            handleUpdateNote={handleUpdateNote}
          />
        ))}
      </ul>
    </div>
  );
}

export default ContactDetails;
