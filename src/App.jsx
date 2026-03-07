import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './shared/NavBar';
import ContactsPage from './pages/ContactsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  //ContactList
  const [contactList, setContactList] = useState([]);

  // Is loading message
  const [isLoading, setIsLoading] = useState(false);

  // Error Message
  const [errorMessage, setErrorMessage] = useState('');

  //Saving
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      };

      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const data = await resp.json();

        const contacts = data.records.map((record) => {
          const contact = {
            contactId: record.fields.id,
            firstName: record.fields.firstName || '',
            lastName: record.fields.lastName || '',
            phone: record.fields.phone || '',
            email: record.fields.email || '',
            jobTitle: record.fields.jobTitle || '',
            company: record.fields.company || '',
            headshot: record.fields.headshot || '',
            website: record.fields.website || '',
          };
          return contact;
        });

        setContactList(contacts);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
    console.log(contactList);
  }, [url, token]);

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
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
