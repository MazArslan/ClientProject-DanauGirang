import axios from "axios";
import LogRocket from "logrocket";

// API call to update user in DB - Called from MoreDetailsModal.js
export const updateUser = (_id, name, email, isAdmin, isActive) => {
  axios
    .post("http://localhost:3000/api/updateUser", {
      _id,
      name,
      email,
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
