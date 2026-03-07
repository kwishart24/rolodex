

function ContactsCard() {
    return (
      <ul>
        <li>Name: {`${contactList.firstName} ${contactList.lastName}`}</li>
        <li>Job Title: {`${contactList.jobTitle}`}</li>
        <li>Company: {`${contactList.company}`}</li>
        <li>Email: {`${contactList.email}`}</li>
        <li>Phone: {`${contactList.phone}`}</li>
        <li>Website: {`${contactList.website}`}</li>
      </ul>
    );
}

export default ContactsCard;