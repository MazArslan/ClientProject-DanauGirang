import axios from "axios";
import LogRocket from "logrocket";

// API call to add user to the DB - Called from NewUserModal.js
export const addUser = (name, email, password, isAdmin, isActive) => {
  axios
    .post("http://localhost:3000/api/addUser", {
      name,
      email,
      password,
      isAdmin,
      isActive
    })
    .then(res => {
      LogRocket.log(res);
    })
    .catch(err => {
      LogRocket.error(err);
    });
};
