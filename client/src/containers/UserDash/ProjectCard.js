import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

const ProjectCard = props => {
  const [CardColour, setCardColour] = useState("");
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    switch (props.type) {
      case "CAMERA_TRAP":
        setCardColour("#95B8D1");
        break;
      case "XS":
        setCardColour("#EDAFB8");
        break;
      default:
        break;
    }
  }, [props.type, CardColour]);

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

  const cardStyle = {
    backgroundColor: CardColour,
    borderColor: CardColour,
    textAlign: "center"
  };

  const style = {
    fontWeight: "bold"
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle style={style}>{props.name}</CardTitle>
          <CardText>{props.desc}</CardText>
          <CardText>Users Assigned:</CardText>
          {Users.map((user, index) => {
            return <CardText key={user._id || index}>{user.email}</CardText>;
          })}
          <LinkContainer to={`/project/${props._id}`}>
            <Button>View Project Page</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </div>
  );
};

ProjectCard.propTypes = {
  _id: propTypes.string,
  name: propTypes.string,
  users: propTypes.array,
  type: propTypes.string,
  desc: propTypes.string
};

export default ProjectCard;
