function Note({
  noteId,
  noteTitle,
  noteBody,
  createdNoteTime,
  editingMode,
  setEditingMode,
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
          <p>Note editing form goes here</p>
        </div>
      )}
    </li>
  );
}

export default Note;
