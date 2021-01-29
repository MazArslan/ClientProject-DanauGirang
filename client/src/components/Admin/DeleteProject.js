import axios from "axios";
import LogRocket from "logrocket";

// API call to remove project
export const deleteProject = _id => {
  axios
    .post("http://localhost:3000/api/deleteProject", {
      _id
    })
    .then(res => {
      LogRocket.log(res);
    })
    .catch(err => {
      LogRocket.error(err);
    });
};
