import Note from "../UI/Note";
import { useState, useEffect } from "react";
import "./NoteBoard.css";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";
import Board from "../UI/Board";
const COLORS = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];
const NoteBoard = (props) => {
  const NOTEDATA = [
    {
      key: 1,
      group: "group1",
      notes: "lorem ipsum dolor sit amet",
      user: "Divyansh",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 2,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Snigdh",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 3,
      group: "group1",
      notes: "lorem ipsum dolor sit amet",
      user: "Aaryan",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 4,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Kuttu",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 5,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Snigdh",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 6,
      group: "group1",
      notes: "lorem ipsum dolor sit amet",
      user: "Aaryan",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 7,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Kuttu",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 8,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Snigdh",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 9,
      group: "group1",
      notes: "lorem ipsum dolor sit amet",
      user: "Aaryan",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 10,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Kuttu",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 11,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Snigdh",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 12,
      group: "group1",
      notes: "lorem ipsum dolor sit amet",
      user: "Aaryan",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
    {
      key: 13,
      group: "group2",
      notes: "lorem ipsum dolor sit amet",
      user: "Kuttu",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    },
  ];

  const [noteData, setNoteData] = useState(NOTEDATA);

  // sort and collect notes by group

  const [noteByGroup, setNotebyGroup] = useState({});

  useEffect(() => {
    const noteByGroup = {};
    noteData.forEach((note) => {
      if (!noteByGroup[note.group]) {
        noteByGroup[note.group] = [];
      }
      noteByGroup[note.group].push(note);
    });
    setNotebyGroup(noteByGroup);
  }, [noteData]);

  const [sortedNoteData, setSortedNoteData] = useState([]);
  useEffect(() => {
    // sort noteData by user
    // make a copy on noteData

    const sortedData = [...noteData].sort((a, b) => {
      if (a.user < b.user) {
        return -1;
      }
      if (a.user > b.user) {
        return 1;
      }
      return 0;
    });
    setSortedNoteData(sortedData);
  }, [noteData]);

  const [sortedGroupedNoteData, setSortedGroupedNoteData] = useState([]);
  useEffect(() => {
    // sort data within each group of noteByGroup
    let groupedData = {};

    for (const group in { ...noteByGroup }) {
      groupedData[group] = { ...noteByGroup }[group].sort((a, b) => {
        if (a.user < b.user) {
          return -1;
        }
        if (a.user > b.user) {
          return 1;
        }
        return 0;
      });
    }
    setSortedGroupedNoteData(groupedData);
  }, [noteByGroup]);

  const onAddNote = (note) => {
    console.log(note);
    setNoteData([
      ...noteData,
      {
        ...note,
        key: noteData.length + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
    ]);
    console.log(noteData);
  };

  const onEditNote = (note) => {
    setEditNote(!editNote);
  };

  const editDetails = (note) => {
    console.log("Editing:", note);
    setNoteData([
      ...noteData,
      {
        ...note,
        key: noteData.length + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      },
    ]);
  };

  const onDeleteNote = (id) => {
    console.log(id);
    setNoteData(noteData.filter((note) => note.key !== id));
  };

  const [sortGroupWise, setSortGroupWise] = useState(false);

  const [editNote, setEditNote] = useState(false);

  const [createNote, setCreateNote] = useState(false);

  const [sortUserWise, setSortUserWise] = useState(false);
  return (
    <>
      <div className="button-container">
        <button
          className="form-button"
          onClick={() => setCreateNote(!createNote)}
        >
          {createNote ? "Close" : "Create Note"}
        </button>
        {createNote && (
          <div className="note-container">
            <CreateNote addNote={onAddNote} />
          </div>
        )}
        {editNote && (
          <div className="note-container">
            <EditNote addNote={editDetails} />
          </div>
        )}

        <button
          className="form-button"
          onClick={() => setSortGroupWise((prev) => !prev)}
        >
          {!sortGroupWise ? "Sort by Group" : "Show All"}
        </button>

        <button
          className="form-button"
          onClick={() => setSortUserWise((prev) => !prev)}
        >
          {!sortUserWise ? "Sort by User" : "Sort by time"}
        </button>
      </div>
      <div className="note--board">
        {sortGroupWise &&
          Object.keys(sortUserWise ? sortedGroupedNoteData : noteByGroup).map(
            (group) =>
              sortGroupWise && (
                <Board key={group} group={group}>
                  {(sortUserWise ? sortedGroupedNoteData : noteByGroup)[
                    group
                  ].map((note) => (
                    <Note
                      key={note.key}
                      note={note}
                      deleteNote={onDeleteNote}
                      editNote={onEditNote}
                      user={note.user}
                      color={note.color}
                      bucket={note.group}
                    >
                      {note.notes}
                    </Note>
                  ))}
                </Board>
              )
          )}
        {!sortGroupWise && (
          <Board group="All">
            {(sortUserWise ? sortedNoteData : noteData).map((note) => (
              <Note
                key={note.key}
                note={note}
                deleteNote={onDeleteNote}
                editNote={onEditNote}
                user={note.user}
                color={note.color}
                bucket={note.group}
              >
                {note.notes}
              </Note>
            ))}
          </Board>
        )}
      </div>
    </>
  );
};

export default NoteBoard;
