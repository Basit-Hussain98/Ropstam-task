import React from "react";

const AddNote = () => {
  return (
    <div className="px-7 py-9 rounded shadow-lg bg-white mb-16">
      <p className="tracking-wider text-slate-600 text-xl mb-5 text-center">
        Note Manager
      </p>
      <div className="flex w-full">
        <input
          className="outline-none bg-slate-100 rounded py-2 px-4 w-96 text-slate-500"
          type="text"
          name=""
          id=""
          placeholder="Add Note.."
        />
        <button className="bg-[#613BF7] text-white px-4 rounded-br  rounded-tr text-xs tracking-widest  ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNote;
