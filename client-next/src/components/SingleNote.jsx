import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleNote = ({ note, id }) => {
  console.log("note", note);
  return (
    <div className="bg-white rounded shadow-lg px-5 py-4  my-2">
      <div className="flex justify-between align-middle">
        <p>{note}</p>
        <div>
          <ModeEditOutlineIcon className="text-green-800 " />
          <DeleteIcon className="text-red-900 " />
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
