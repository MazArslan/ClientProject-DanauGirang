import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import MoreDetails from "../../containers/AdminDash/EditUserModal";

// User card with states dependent on admin privs
const UserCard = props => {
  const [CardColour, setCardColour] = useState("");

  useEffect(() => {
    switch (props.isActive) {
      case true:
        setCardColour("#95B8D1");
        break;
      case false:
        setCardColour("#EDAFB8");
        break;
      default:
        break;
    }
  }, [props.isActive, CardColour]);

  const cardStyle = {
    backgroundColor: CardColour,
    borderColor: CardColour,
    textAlign: "center",
    margin: "0 auto",
    width: "45%"
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardTitle>{props.email}</CardTitle>
          <MoreDetails
            _id={props._id}
            name={props.name}
            email={props.email}
            isAdmin={props.isAdmin}
            isActive={props.isActive}
          />
        </CardBody>
      </Card>
      <br></br>
    </div>
  );
};

UserCard.propTypes = {
  _id: propTypes.string,
  name: propTypes.string,
  email: propTypes.string,
  users: propTypes.array,
  isActive: propTypes.bool,
  isAdmin: propTypes.bool
};

export default UserCard;
