import React from "react";
import SingleNote from "./SingleNote";

const NotesList = () => {
  const [notes, setNotes] = React.useState([
    { id: 1, note: "First Note" },
    { id: 2, note: "Second Note" },
    { id: 3, note: "Third Note" },
    { id: 4, note: "Forth Note" },
  ]);

  return (
    <div>
      {notes.map((n) => {
        console.log("hello", n);
        return <SingleNote note={n.note} />;
      })}
    </div>
  );
};

export default NotesList;
