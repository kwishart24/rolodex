import ContactForm from './ContactForm';

function EditContactForm({
  contactFormData,
  handleContactChange,
  handleUpdateContact,
  isSaving,
  handleFileChange,
}) {
  return (
    <ContactForm
      contactFormData={contactFormData}
      handleContactChange={handleContactChange}
      handleUpdateContact={handleUpdateContact}
      isSaving={isSaving}
      handleFileChange={handleFileChange}
    />
  );
}

export default EditContactForm;
