import React from "react";
import { BsThreeDots } from "react-icons/bs";

const EditButton = ({ setToEdit, id }) => {
  return (
    <button className="editButton" onClick={() => setToEdit(id)}>
      <BsThreeDots size={24} />
    </button>
  );
};

export default EditButton;