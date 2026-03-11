import { useState } from 'react';
import { createNote } from '../api';
import { uploadHeadshot } from '../upload';
import ContactForm from '../features/contacts/ContactForm';
import NoteForm from '../features/notes/NoteForm';

function NewContactFormPage({
  noteFormData,
  handleNoteChange,
  setNoteFormData,
  isSaving,
  setIsSaving,
  createContactInAirtable,
  contactFormData,
  setContactFormData,
  handleContactChange,
  headshotFile,
  setHeadshotFile,
  handleFileChange,
  errorMessage,
  setErrorMessage,
}) {
  const [successMessage, setSuccessMessage] = useState('');

  const [newContactId, setNewContactId] = useState(null);

  const handleCreateContact = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    //validation requires first or last name
    if (!contactFormData.firstName.trim() && !contactFormData.lastName.trim()) {
      setErrorMessage('Please enter at least a first name or a last name.');
      setIsSaving(false);
      return;
    }

    try {
      let headshotUrl = '';

      // Upload headshot if provided
      if (headshotFile) {
        headshotUrl = await uploadHeadshot(headshotFile);
      }

      // Create the contact
      const createdContact = await createContactInAirtable({
        ...contactFormData,
        headshot: headshotUrl ? [{ url: headshotUrl }] : [],
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

      // Reset form
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

      // Optional: reset note form
      setNoteFormData({ noteTitle: '', noteBody: '' });

      // Show success message
      setSuccessMessage('Your new contact has been created!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="new-contact-page">
      <h2>Add New Contact</h2>
      {successMessage && (
        <>
          <p className="success">{successMessage}</p>
          <button>
            <a href="/">Go to My Contacts</a>
          </button>
          <button>
            <a href={`/${newContactId}`}>View your new contact</a>
          </button>
        </>
      )}

      <form onSubmit={handleCreateContact}>
        <ContactForm
          contactFormData={contactFormData}
          handleContactChange={handleContactChange}
          handleFileChange={handleFileChange}
          isSaving={isSaving}
          successMessage={successMessage}
          newContactId={newContactId}
          errorMessage={errorMessage}
        />

        <h3>Notes</h3>
        <NoteForm
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
