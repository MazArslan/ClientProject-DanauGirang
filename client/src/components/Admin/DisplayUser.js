import React from "react";
import propTypes from "prop-types";
// import MoreDetails from "../../containers/AdminDash/MoreDetailsModal";
import UserCard from "./UserCard";

// Display user card
const DisplayUser = props => {
  return (
    <div>
      <UserCard
        _id={props._id}
        name={props.name}
        email={props.email}
        isAdmin={props.isAdmin}
        isActive={props.isActive}
      />
    </div>
  );
};

DisplayUser.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
  isAdmin: propTypes.bool,
  isActive: propTypes.bool,
  _id: propTypes.string
};

export default DisplayUser;
