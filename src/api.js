const contactsUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_CONTACTS_TABLE_NAME}`;
const notesUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_NOTES_TABLE_NAME}`;
const airtableToken = `Bearer ${import.meta.env.VITE_PAT}`;

//fetching contacts from Airtable
export const fetchContacts = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: airtableToken,
      'Content-Type': 'application/json',
    },
  };

  try {
    const resp = await fetch(contactsUrl, options);

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();

    //displaying fetched data for each contact in airtable
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
          headshot: record.fields.headshot?.[0].url || null,
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

//fetching notes from Airtable
export const fetchNotes = async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: airtableToken,
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

//create new contact in contact form
export const createContact = async (newContact) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: airtableToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        phone: newContact.phone,
        email: newContact.email,
        jobTitle: newContact.jobTitle,
        company: newContact.company,
        website: newContact.website,
        headshot: newContact.headshot || [],
      },
    }),
  };

  try {
    const resp = await fetch(contactsUrl, options);

    if (!resp.ok) {
      throw new Error(`Error creating contact: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Create new note
export const createNote = async (newNote) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: airtableToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        noteTitle: newNote.noteTitle,
        noteBody: newNote.noteBody,
        contactId: [newNote.contactId],
        createdNoteTime: new Date().toISOString(),
      },
    }),
  };

  try {
    const resp = await fetch(notesUrl, options);

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Airtable error:', errorText);
      throw new Error(`Error creating note: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update contact
export const updateContact = async (contactId, fields) => {
  const recordUrl = `${contactsUrl}/${contactId}`;
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: airtableToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields,
    }),
  };

  try {
    const resp = await fetch(recordUrl, options);

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Airtable error:', errorText);
      throw new Error(`Error updating contact: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update notes
export const updateNote = async (noteId, fields) => {
  const noteUrl = `${notesUrl}/${noteId}`;
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: airtableToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields,
    }),
  };

  try {
    const resp = await fetch(noteUrl, options);

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Airtable error:', errorText);
      throw new Error(`Error updating note: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
