function ContactsPage({ contactList}) {
  console.log(contactList);

  return (
    <>
      <h1>My Contacts</h1>
      <div>
        {contactList.map((contact) => (
          <div key={contact.contactId} className="contact-card">
            <img src={contact.headshot} />
            <p>
              {contact.firstName} {contact.lastName} <br />
              {contact.jobTitle} {'| '}
              {contact.company}
            </p>
            <a href="#">More Info</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactsPage;
