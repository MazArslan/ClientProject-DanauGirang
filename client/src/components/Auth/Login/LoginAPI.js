import axios from "axios";
import jwt from "jsonwebtoken";

// On submit function
export const loginUser = (email, password) => {
  axios
    .post("http://localhost:3000/api/login", {
      email,
      password
    })
    .then(res => {
      const { token } = res.data;
      window.sessionStorage.setItem("token", token);
      const decodeToken = jwt.decode(token);
      if (decodeToken.isAdmin) {
        window.location.replace("/adminArea");
      } else {
        window.location.replace("/userArea");
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
