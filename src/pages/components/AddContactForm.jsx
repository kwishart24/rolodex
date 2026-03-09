import { useState } from 'react';
import { createContact } from '../../api';
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

    let headshotUrl = '';

    if (headshotFile) {
      headshotUrl = await uploadHeadshot(headshotFile);
    }

    const createdContact = await createContact({
      ...contactFormData,
      headshot: headshotUrl,
    });
    console.log('New contact created:', createdContact);
    console.log('Cloudinary URL:', headshotUrl);

    setNewContactId(createdContact.id);

    setContactFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      jobTitle: '',
      company: '',
      website: '',
    });

    setHeadshotFile(null);

    setSuccessMessage('Your new contact has been created!');
  };

  return (
    <div>
      {successMessage && (
        <div>
          <p className="success">{successMessage}</p>
          <button>
            <a href="/">Return to My Contacts</a>
          </button>
          <button>
            <a href={newContactId}>View New Contact</a>
          </button>
        </div>
      )}
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

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddContactForm;
