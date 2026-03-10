import { useState } from 'react';
import { createContact, createNote } from '../api';
import { uploadHeadshot } from '../upload';
import AddNewContact from '../features/contacts/AddNewContact';
import AddNewNote from '../features/notes/AddNewNote';

function NewContactFormPage({
  noteFormData,
  handleNoteChange,
  setNoteFormData,
  isSaving,
  setIsSaving,
}) {
  const [headshotFile, setHeadshotFile] = useState(null);

  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    jobTitle: '',
    company: '',
    website: '',
  });

  const [newContactId, setNewContactId] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    setContactFormData({
      ...contactFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setHeadshotFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');

    try {
      let headshotUrl = '';

      if (headshotFile) {
        headshotUrl = await uploadHeadshot(headshotFile);
      }

      //Create the contact
      const createdContact = await createContact({
        ...contactFormData,
        headshot: headshotUrl,
      });

      //Create the note
      if (noteFormData.noteTitle || noteFormData.noteBody) {
        await createNote({
          ...noteFormData,
          contactId: createdContact.id,
          createdNoteTime: noteFormData.createdNoteTime,
        });
      }

      //capture new contact id so user can navigate to it once its created
      setNewContactId(createdContact.id);

      //clear form data and notes section
      setContactFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        jobTitle: '',
        company: '',
        website: '',
      });

      setNoteFormData({
        noteTitle: '',
        noteBody: '',
      });

      setHeadshotFile(null);

      //Show success message
      setSuccessMessage('Your new contact has been created!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {isSaving ? (
        <div className="saving-box">
          <p>Saving your contact...</p>
        </div>
      ) : successMessage ? (
        <div className="success-box">
          <p>{successMessage}</p>
          <button>
            <a href="/">Return to My Contacts</a>
          </button>
          <button>
            <a href={newContactId}>View New Contact</a>
          </button>
        </div>
      ) : null}

      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <AddNewContact
          contactFormData={contactFormData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
        <h3>Notes</h3>
        <AddNewNote
          noteFormData={noteFormData}
          handleNoteChange={handleNoteChange}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default NewContactFormPage;
