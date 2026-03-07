import ContactsCard from './components/ContactsCard';

function ContactsPage({ contactList }) {
  console.log(contactList);
  return (
    <>
      <h1>My Contacts</h1>
      <div>
        <ContactsCard />
      </div>
    </>
  );
}

export default ContactsPage;
