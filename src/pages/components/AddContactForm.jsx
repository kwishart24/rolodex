import { useState } from 'react';
import { createContact } from '../../api';

function AddContactForm() {
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    jobTitle: '',
    company: '',
    website: '',
  });

  const handleChange = (event) => {
    setContactFormData({
      ...contactFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createdContact = await createContact(contactFormData);
    console.log('New contact created:', createdContact);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="headshot">Headshot:</label>
        <input
          type="file"
          id="headshot"
          name="headshot"
          accept="image/png, image/jpeg"
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

        <button type="submit">Add New Contact</button>
      </form>
    </div>
  );
}

export default AddContactForm;
