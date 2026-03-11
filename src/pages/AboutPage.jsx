function AboutPage() {
  return (
    <div className="about-page">
      <p>
        This Rolodex app is a simple, modern way to keep track of the people you
        meet. You can add new contacts, upload a headshot, write notes, and
        quickly search through your list to find exactly who you’re looking for.
        All data is stored in Airtable to keep everything organized and
        accessible.
      </p>

      <p>
        The goal of this project was to build a clean, responsive React
        application that demonstrates real‑world skills like routing, controlled
        forms, API integration, and modular component design.
      </p>

      <h2>Tech Stack</h2>

      <ul>
        <li>
          <strong>Frontend:</strong> React, React Router, CSS Modules
        </li>
        <li>
          <strong>Backend / Data:</strong> Airtable API
        </li>
        <li>
          <strong>Features:</strong> Add/edit contacts, headshot upload, notes,
          search, clean component structure
        </li>
      </ul>
    </div>
  );
}

export default AboutPage;
