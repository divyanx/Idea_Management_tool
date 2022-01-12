import "./Note.css";
import Edit from "./Edit";
const Note = (props) => {
  const onDelete = () => {
    props.deleteNote(props.note.key);
    console.log(props);
  };

  const onEdit = () => {
    props.editNote(props.note);
    props.deleteNote(props.note.key);
    console.log(props);
  };

  return (
    <div className="note note--sticky" style={{ backgroundColor: props.color }}>
      <div className="note--bucket">{props.bucket}</div>
      <Edit className="note--edit" onClick={onEdit} />
      <button className="note--delete" onClick={onDelete}>
        X
      </button>
      <p className="note--text"> {props.children}</p>
      <p className="note--user"> {"-" + props.user}</p>
    </div>
  );
};

export default Note;
