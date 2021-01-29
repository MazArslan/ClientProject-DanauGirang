import React, { useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

import { ListGroup, ListGroupItem } from "reactstrap";

import "./UserList.css";

const UserList = props => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getNames", { users: props.users })
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [props.users]);

  return (
    <div>
      <h3 className="userList--title">Staff on Project</h3>
      <ListGroup className="userList--list">
        {Users.map((user, index) => {
          return (
            <ListGroupItem className="userList--item" key={user._id || index}>
              {user.email}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

UserList.propTypes = {
  users: propTypes.array
};

export default UserList;
