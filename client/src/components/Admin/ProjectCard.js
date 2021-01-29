/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import ProjectDetails from "../../containers/AdminDash/EditProjectsModal";

// Project card for projects
const ProjectCard = props => {
  const [Users, setUsers] = useState([]);

  const cardStyle = {
    backgroundColor: "#ab8fc9",
    borderColor: "#ab8fc9",
    textAlign: "center",
    margin: "0 auto",
    width: "45%"
  };

  // using users as props for getting usernames

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
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <ProjectDetails
            _id={props._id}
            name={props.name}
            type={props.type}
            description={props.description}
            users={props.users}
            details={props.details}
            tags={props.tags}
          />
          <br></br>
          <LinkContainer to={`/adproject/${props._id}`}>
            <Button>View Project Page</Button>
          </LinkContainer>
        </CardBody>
      </Card>
      <br></br>
    </div>
  );
};

ProjectCard.propTypes = {
  _id: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  details: propTypes.string,
  description: propTypes.string,
  users: propTypes.array,
  tags: propTypes.array
};

export default ProjectCard;
