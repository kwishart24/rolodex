function ContactInfo(props) {
  return (
    <div className="contact-info">
      <img src={props.headshot} />
      <ul>
        <li>Name: {`${props.firstName} ${props.lastName}`}</li>
        <li>Job Title: {`${props.jobTitle}`}</li>
        <li>Company: {`${props.company}`}</li>
        <li>Email: {`${props.email}`}</li>
        <li>Phone: {`${props.phone}`}</li>
        <li>
          Website: <a>{`${props.website}`}</a>
        </li>
      </ul>
    </div>
  );
}

export default ContactInfo;
