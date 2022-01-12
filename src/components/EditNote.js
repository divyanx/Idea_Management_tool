// create a popup to create a new note
import { useState } from "react";
import "./CreateNote.css";
const EditNote = (props) => {
  const [note, setNote] = useState({
    group: "",
    notes: "",
    user: "",
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("after submmitting: ",note);
    props.addNote(note);
    setNote({
      group: "",
      notes: "",
      user: "",
    });
  };

  return (
    <div className="create-note">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="group">Group</label>
            <input
              type="text"
              name="group"
              id="group"
              value={note.group}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="user">User</label>
            <input
              type="text"
              name="user"
              id="user"
              value={note.user}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="notes">Notes</label>
            <textarea
              type="text-area"
              name="notes"
              id="notes"
              value={note.notes}
              onChange={handleChange}
            />
          </div>
          <button className="form-button" type="submit">
            Edit Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
