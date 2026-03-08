import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './shared/NavBar';
import { fetchContacts, fetchNotes } from './api';
import ContactsPage from './pages/ContactsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactDetails from './pages/components/ContactDetails';
import AddContactForm from './pages/components/AddContactForm';

function App() {
  // const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  // const token = `Bearer ${import.meta.env.VITE_PAT}`;

  //ContactList
  const [contactList, setContactList] = useState([]);

  //NotesList
  const [notesList, setNotesList] = useState([]);

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
        console.log(contactList);
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
          element={<ContactsPage contactList={contactList} />}
        ></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/:contactId" element={<ContactDetails />}></Route>
        <Route path="/addContact" element={<AddContactForm/>}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
