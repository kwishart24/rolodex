import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router';
import { fetchContacts, updateContact, createContact } from './api';
import Header from './shared/Header';
import ContactsPage from './pages/ContactsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactDetails from './pages/ContactDetails';
import NewContactFormPage from './pages/NewContactPage';
import Footer from './shared/Footer';

function App() {
  // const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  // const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const location = useLocation();

  const [title, setTitle] = useState('');

  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      setTitle('My Contacts');
    } else if (path === '/about') {
      setTitle('About');
    } else if (path === '/addcontact') {
      setTitle('Add New Contact');
    } else if (path.startsWith('/') && path.split('/').length === 2) {
      // Matches "/12345" or "/abcde"
      setTitle('Contact Details');
    } else {
      setTitle('Not Found');
    }
  }, [location.pathname]);

  //ContactList
  const [contactList, setContactList] = useState([]);

  //creating new contacts
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    jobTitle: '',
    company: '',
    website: '',
  });

  //headshot file state
  const [headshotFile, setHeadshotFile] = useState(null);

  const handleFileChange = (e) => {
    setHeadshotFile(e.target.files[0]);
  };

  const createContactInAirtable = async (newContactData) => {
    const createdContact = await createContact(newContactData); // your API call

    const updatedContacts = await fetchContacts();
    setContactList(updatedContacts);

    return createdContact; // so NewContactPage can redirect to it
  };

  //update contact in airtable
  const updateContactInAirtable = async (contactId, updatedData) => {
    await updateContact(contactId, updatedData);

    const updatedContacts = await fetchContacts();
    setContactList(updatedContacts);
  };

  //when contact is changed for form input
  const handleContactChange = (event) => {
    setContactFormData({
      ...contactFormData,
      [event.target.name]: event.target.value,
    });
  };

  //creating new notes
  const [noteFormData, setNoteFormData] = useState({
    noteTitle: '',
    noteBody: '',
  });

  //when note is changed, change handler
  const handleNoteChange = (event) => {
    setNoteFormData({
      ...noteFormData,
      [event.target.name]: event.target.value,
    });
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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <ContactsPage
              contactList={contactList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
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
              contactFormData={contactFormData}
              setContactFormData={setContactFormData}
              handleContactChange={handleContactChange}
              updateContactInAirtable={updateContactInAirtable}
              contactList={contactList}
              headshotFile={headshotFile}
              setHeadshotFile={setHeadshotFile}
              handleFileChange={handleFileChange}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
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
              contactFormData={contactFormData}
              setContactFormData={setContactFormData}
              handleContactChange={handleContactChange}
              createContactInAirtable={createContactInAirtable}
              headshotFile={headshotFile}
              setHeadshotFile={setHeadshotFile}
              handleFileChange={handleFileChange}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
