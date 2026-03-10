function NoteForm({ noteFormData, handleNoteChange }) {
  return (
    <div className="note-form">
      <label htmlFor="noteTitle">Note Title:</label>
      <input
        type="text"
        id="noteTitle"
        name="noteTitle"
        value={noteFormData.noteTitle}
        onChange={handleNoteChange}
      ></input>

      <label htmlFor="noteBody">Note Body:</label>
      <textarea
        id="noteBody"
        name="noteBody"
        value={noteFormData.noteBody}
        onChange={handleNoteChange}
      ></textarea>
    </div>
  );
}

export default NoteForm;
