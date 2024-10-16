import React from "react";

const DeleteButton = ({ text, action }) => {
  return <button onClick={() => action()}>{text}</button>;
};

export default DeleteButton;