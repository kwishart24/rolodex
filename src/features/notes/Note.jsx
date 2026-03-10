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
  handleNoteChange,
  handleUpdateNote,
  handleSaveNote,
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
          <EditNoteForm
            isSaving={isSaving}
            setIsSaving={setIsSaving}
            noteFormData={noteFormData}
            handleNoteChange={handleNoteChange}
            handleUpdateNote={handleUpdateNote}
            handleSaveNote={handleSaveNote}
          />
        </div>
      )}
    </li>
  );
}

export default Note;
