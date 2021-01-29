import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";

import axios from "axios";
import SectionTitle from "../../components/User/ProjectStatsTitle";
import UserList from "../ProjectDetails/UserList/UserList";
import StatsSection from "./StatsSection";

import "../ProjectDetails/projectDetailStyle.css";

const ProjectDetail = () => {
  const { _id } = useParams();
  const [details, setDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, seterror] = useState("");

  // get project details
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getProject", {
        params: {
          _id
        }
      })
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        seterror(err);
      });
  }, [_id]);

  // admin limited details for each project - overview
  return (
    <div>
      <Container fluid>
        <Jumbotron fluid>
          <h1 className="display-3">{details.name}</h1>
          <br></br>
          <br></br>
          <h4 className="display-4">{details.type}</h4>
        </Jumbotron>
      </Container>
      <Container>
        <p>{details.description}</p>
      </Container>
      <Container>
        <SectionTitle title="Project Stats" />
        <StatsSection projectID={_id} />
      </Container>
      <Container>
        <SectionTitle title="Project Information" />
        <UserList users={details.users} />
      </Container>
    </div>
  );
};
/**
 * Number of Images
 * Number of Accessed Images
 * A link to Upload Images
 * A link to view all images
 * User Emails
 * A link to Map
 */
export default ProjectDetail;
