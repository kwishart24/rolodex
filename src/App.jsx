import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './shared/NavBar';
import { fetchContacts } from './api';
import ContactsPage from './pages/ContactsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactDetails from './pages/ContactDetails';
import NewContactFormPage from './pages/NewContactPage';

function App() {
  // const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  // const token = `Bearer ${import.meta.env.VITE_PAT}`;

  //ContactList
  const [contactList, setContactList] = useState([]);

  //NotesList
  const [notesList, setNotesList] = useState([]);

  //creating new notes
  const [noteFormData, setNoteFormData] = useState({
    noteTitle: '',
    noteBody: '',
  });

  //when new note is saved
  const handleNoteChange = (event) => {
    setNoteFormData({
      ...noteFormData,
      [event.target.name]: event.target.value,
    });
  };

  //when contact is updated
  const handleUpdateContact = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await updateContact(currentContact.contactId, contactFormData);
      setEditingMode(null);
      refreshContacts();
    } finally {
      setIsSaving(false);
    }
  };

  // Is loading message
  const [isLoading, setIsLoading] = useState(false);

  // Error Message
  const [errorMessage, setErrorMessage] = useState('');

  //Saving
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchContacts()
      .then((contacts) => {
        setContactList(contacts);
        setIsLoading(false);
        //console.log(contactList);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Rolodex</h1>
      <Routes>
        <Route
          path="/"
          element={
            <ContactsPage
              contactList={contactList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        ></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route
          path="/:contactId"
          element={
            <ContactDetails
              noteFormData={noteFormData}
              handleNoteChange={handleNoteChange}
              setNoteFormData={setNoteFormData}
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        ></Route>
        <Route
          path="/addContact"
          element={
            <NewContactFormPage
              noteFormData={noteFormData}
              handleNoteChange={handleNoteChange}
              setNoteFormData={setNoteFormData}
              isSaving={isSaving}
              setIsSaving={setIsSaving}
            />
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
