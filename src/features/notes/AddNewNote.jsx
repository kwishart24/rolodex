function AddNewNote({ noteFormData, handleNoteChange }) {
  return (
    <>
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
    </>
  );
}

export default AddNewNote;
