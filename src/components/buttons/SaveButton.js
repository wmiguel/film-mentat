import React from "react";

const SaveButton = ({ action }) => {
  return (
    <button onClick={(e) => action(e)}>Save</button>
  );
};

export default SaveButton;