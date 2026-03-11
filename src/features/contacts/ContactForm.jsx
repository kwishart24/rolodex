function ContactForm({
  contactFormData,
  handleContactChange,
  handleFileChange,
  errorMessage,
}) {
  return (
    <div className="contact-form">
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="contact-form-fields">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={contactFormData.firstName}
          onChange={handleContactChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={contactFormData.lastName}
          onChange={handleContactChange}
        />

        <label htmlFor="phone">Phone #:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={contactFormData.phone}
          onChange={handleContactChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactFormData.email}
          onChange={handleContactChange}
        />

        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={contactFormData.jobTitle}
          onChange={handleContactChange}
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={contactFormData.company}
          onChange={handleContactChange}
        />

        <label htmlFor="website">Website:</label>
        <input
          type="url"
          id="website"
          name="website"
          value={contactFormData.website}
          onChange={handleContactChange}
        />

        {handleFileChange && (
          <>
            <label htmlFor="headshot">Headshot:</label>
            <input
              type="file"
              id="headshot"
              name="headshot"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
