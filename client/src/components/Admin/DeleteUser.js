import axios from "axios";
import LogRocket from "logrocket";

// API call to delete user from the DB - Called from MoreDetailsModal.js
export const deleteUser = _id => {
  axios
    .post("http://localhost:3000/api/deleteUser", {
      _id
    })
    .then(res => {
      LogRocket.log(res);
    })
    .catch(err => {
      LogRocket.error(err);
    });
};
