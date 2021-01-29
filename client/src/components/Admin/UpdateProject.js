import axios from "axios";
import LogRocket from "logrocket";

// API call to update project in DB
export const updateProject = (
  _id,
  name,
  type,
  details,
  description,
  users,
  tags
) => {
  // eslint-disable-next-line no-param-reassign
  tags = tags.split(",");
  axios
    .post("http://localhost:3000/api/updateProject", {
      _id,
      type,
      details,
      description,
      users,
      name,
      tags
    })
    .then(res => {
      LogRocket.log(res);
    })
    .catch(err => {
      LogRocket.error(err);
    });
};
