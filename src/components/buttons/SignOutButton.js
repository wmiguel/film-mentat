import React from "react";

const SignOutButton = ({ handleSignOut }) => {
  return (
    <button onClick={handleSignOut}>Log Out</button>
  );
};

export default SignOutButton;