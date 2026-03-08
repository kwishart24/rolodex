import { useParams } from 'react-router';

function ContactDetails(props) {
  const params = useParams();
  console.log(params);
  return (
    <ul>
      <li>Name: {`${props.firstName} ${props.lastName}`}</li>
      <li>Job Title: {`${props.jobTitle}`}</li>
      <li>Company: {`${props.company}`}</li>
      <li>Email: {`${props.email}`}</li>
      <li>Phone: {`${props.phone}`}</li>
      <li>Website: {`${props.website}`}</li>
    </ul>
  );
}

export default ContactDetails;
