import { useCallback } from 'react';

function ContactsPage({ contactList, isLoading, queryString, setQueryString }) {
  // --- useCallback for search input ---
  const handleSearchChange = useCallback(
    (e) => setQueryString(e.target.value),
    [setQueryString]
  );

  //searching
  const filteredContacts = contactList.filter((contact) => {
    const q = queryString.toLowerCase();

    return (
      contact.firstName.toLowerCase().includes(q) ||
      contact.lastName.toLowerCase().includes(q) ||
      contact.company.toLowerCase().includes(q) ||
      contact.jobTitle.toLowerCase().includes(q)
    );
  });
  if (isLoading) {
    return <p>Loading contacts...</p>;
  }
  return (
    <>
      <div className="contact-controls">
        <input
          type="text"
          placeholder="Search contacts..."
          value={queryString}
          onChange={handleSearchChange}
        />
        <button
          type="button"
          onClick={() => setQueryString('')}
          disabled={queryString === ''}
          className="clear-search"
        >
          Clear
        </button>
      </div>
      {filteredContacts.length === 0 && (
        <p className="no-results">No results found.</p>
      )}

      <div>
        {filteredContacts.map((contact) => (
          <div key={contact.contactId} className="contact-card">
            {contact.headshot && contact.headshot.length !== 0 && (
              <img
                src={
                  Array.isArray(contact.headshot)
                    ? contact.headshot[0]?.url
                    : contact.headshot
                }
                alt={
                  contact.firstName || contact.lastName
                    ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim()
                    : 'Contact headshot'
                }
              />
            )}

            <p>
              {contact.firstName} {contact.lastName} <br />
              {contact.jobTitle} {'| '}
              {contact.company}
            </p>
            <a href={contact.contactId}>More Info</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContactsPage;
