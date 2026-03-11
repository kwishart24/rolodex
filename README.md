# Rolodex - A Modern Contact & Notes Manager

Rolodex is a full‑stack React application for organizing professional contacts and keeping track of important interactions. It combines a clean, intuitive UI with a real Airtable backend, allowing users to create, update, and manage contacts, upload headshots, and attach notes — all in one place.

This project demonstrates practical, real‑world React patterns including routing, reusable components, controlled forms, file uploads, and relational data handling.

## Libraries Used

- React + React Router
- Airtable API
- Cloudinary Upload
- Vite

This project does not use any dependencies that directly manipulate the DOM

## How to Install & Run

1. Fork the Repository

Click on the "Fork" button to fork the project into your own repository.

2. Clone the Repository

Get the URL for the project by clicking "Code" and copying the URL under the HTTPS tab. Then in your terminal, type:

git clone <URL>
cd your-repo-name

3. Install Dependencies

In your terminal type:

npm install

4. Set up Free Airtable Account and Airtables

Once you've created your free Airtable account, create 2 tables. One named "contacts" and the other named "notes".

Here are the columns for the contacts table:

- contactId - formula field with the formula "RECORD_ID()"
- firstName - single line text field
- lastName - single line text field
- phone - phone number field
- email - email field
- jobTitle - single line text field
- company - single line text field
- website - url field
- headshot - attachment field, format = files
- createdContactTime - Date field, switch to Include Time, Time format: 24 hour

Here are the columns for the notes table:

- createdNoteTime - Date field, switch to Include Time, Time format: 24 hour
- noteId - formula field with the formula "RECORD_ID()"
- noteTitle - single line text field
- noteBody - long text field
- contactId - link to contacts field

Once you've created your notes table, you can add these lookup fields to the contacts table as well as:

- notes - linked field, make sure that "Allow linking to multiple records" is toggled on
- noteTitle
- note
- createdNoteTime

Make sure they are linked by "contactId" which is a recordId formula. Make sure the relation is one to many from the contacts table to the notes table.

5. Create Free Cloudinary Account and Preset

Create a free account and then create a preset that is "unsigned" and allows uploads.

6. Set up Environment Variables

Create a .env.local file in your root folder. Copy and paste this code into the file, replacing the values with your own info from your Airtable and Cloudinary accounts:

VITE_AIRTABLE_API_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID=your_airtable_base_id
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

7. Start the Development Server

In your terminal, type:

npm run dev

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
