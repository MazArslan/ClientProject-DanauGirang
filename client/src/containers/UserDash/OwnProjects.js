import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import ProjectCard from "./ProjectCard";

/** List of projects attached to the currently logged in user */
const OwnProjects = () => {
  const [Projects, setProjects] = useState([]);
  const [Error, setError] = useState("");
  const encodedToken = window.sessionStorage.getItem("token");
  const decodedToken = JSON.parse(atob(encodedToken.split(".")[1]));

  // Gets current users id from localstorage and gets projects they are associated with
  useEffect(() => {
    axios
      .post("http://localhost:3000/api/getProjectsByUser", {
        _id: decodedToken._id
      })
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        setError(err);
      });
  }, [decodedToken._id]);
  return (
    <div>
      <Container>
        {Projects.map((project, index) => {
          return (
            <ProjectCard
              key={project._id || index}
              name={project.name}
              users={project.users}
              type={project.type}
              desc={project.description}
            />
          );
        })}
        <div>
          <h3>{Error}</h3>
        </div>
      </Container>
    </div>
  );
};

export default OwnProjects;
