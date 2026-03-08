function Note(props) {
    return (
      <li key={props.noteId}>
        <p>{props.createdNoteTime}</p>
        <strong>{props.noteTitle}</strong>
        <p>{props.noteBody}</p>
      </li>
    );
}

export default Note