import { useState } from 'react';
import { createContact, createNote } from '../../api';
import { uploadHeadshot } from '../../upload';

function AddContactForm() {
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

  const [noteFormData, setNoteFormData] = useState({
    noteTitle: '',
    noteBody: '',
  });

  //Saving
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    setContactFormData({
      ...contactFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setHeadshotFile(event.target.files[0]);
  };

  const handleNoteChange = (event) => {
    setNoteFormData({
      ...noteFormData,
      [event.target.name]: event.target.value,
    });
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

      {/* {successMessage && (
        <div>
          <p className="success">{successMessage}</p>
          <button>
            <a href="/">Return to My Contacts</a>
          </button>
          <button>
            <a href={newContactId}>View New Contact</a>
          </button>
        </div>
      )} */}

      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="headshot">Headshot:</label>
        <input
          type="file"
          id="headshot"
          name="headshot"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={contactFormData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={contactFormData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone #:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={contactFormData.phone}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactFormData.email}
          onChange={handleChange}
        />

        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={contactFormData.jobTitle}
          onChange={handleChange}
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={contactFormData.company}
          onChange={handleChange}
        />

        <label htmlFor="website">Website:</label>
        <input
          type="url"
          id="website"
          name="website"
          value={contactFormData.website}
          onChange={handleChange}
        />

        <h3>Notes</h3>

        <label htmlFor="noteTitle">Note Title:</label>
        <input
          type="text"
          id="noteTitle"
          name="noteTitle"
          value={noteFormData.noteTitle}
          onChange={handleNoteChange}
        ></input>

        <label htmlFor="noteBody">Note Body:</label>
        <textarea
          id="noteBody"
          name="noteBody"
          value={noteFormData.noteBody}
          onChange={handleNoteChange}
        ></textarea>

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default AddContactForm;
