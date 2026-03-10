import NoteForm from './NoteForm';

function Note({
  noteId,
  noteTitle,
  noteBody,
  createdNoteTime,
  editingMode,
  setEditingMode,
  isSaving,
  setIsSaving,
  noteFormData,
  handleUpdateNote,
  handleSaveNote,
  handleNoteChange,
}) {
  const isEditingThisNote =
    editingMode?.type === 'note' && editingMode?.id === noteId;
  return (
    <li key={noteId}>
      <p>{createdNoteTime}</p>
      <strong>{noteTitle}</strong>
      <p>{noteBody}</p>

      <button
        onClick={() =>
          setEditingMode(
            isEditingThisNote ? null : { type: 'note', id: noteId }
          )
        }
        disabled={editingMode?.type === 'contact'}
      >
        {isEditingThisNote ? 'Cancel' : 'Edit Note'}
      </button>
      {isEditingThisNote && (
        <div className="note-edit-form">
          <NoteForm
            isSaving={isSaving}
            setIsSaving={setIsSaving}
            noteFormData={noteFormData}
            handleUpdateNote={handleUpdateNote}
            handleSaveNote={handleSaveNote}
            handleNoteChange={handleNoteChange}
          />
          <button onClick={() => handleUpdateNote(noteId)} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      )}
    </li>
  );
}

export default Note;
