import React from "react";

const LogoutButton = () => {
  const logoutUser = () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
