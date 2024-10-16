import React from "react";

const AddScreeningButton = ({ addScreening, eventData }) => {
  return (
    <button onClick={() => addScreening(eventData)}>Add to Calendar</button>
  );
};

export default AddScreeningButton;