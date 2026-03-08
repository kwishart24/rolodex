const contactsUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_CONTACTS_TABLE_NAME}`;
const notesUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_NOTES_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export const fetchContacts = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const resp = await fetch(contactsUrl, options);

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();

    const contacts = data.records
      .map((record) => {
        if (!record.fields.firstName && !record.fields.lastName) {
          return null;
        }

        const contact = {
          contactId: record.id,
          firstName: record.fields.firstName || '',
          lastName: record.fields.lastName || '',
          phone: record.fields.phone || '',
          email: record.fields.email || '',
          jobTitle: record.fields.jobTitle || '',
          company: record.fields.company || '',
          headshot: record.fields.headshot?.[0].url || '',
          website: record.fields.website || '',
        };
        return contact;
      })
      .filter((contact) => {
        return contact !== null;
      });
    return contacts;
  } catch {
    console.log('Hello');
  }
};

export const fetchNotes = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const resp = await fetch(notesUrl, options);

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();

    const notes = data.records
      .map((record) => {
        if (!record.fields.noteTitle && !record.fields.noteBody) {
          return null;
        }

        const note = {
          noteId: record.id,
          noteTitle: record.fields.noteTitle || '',
          noteBody: record.fields.noteBody || '',
          contactId: record.fields.contactId?.[0] || '',
          createdNoteTime: record.fields.createdNoteTime || '',
        };
        return note;
      })
      .filter((note) => {
        return note !== null;
      });
    return notes;
  } catch {
    console.log('Hello');
  }
};
