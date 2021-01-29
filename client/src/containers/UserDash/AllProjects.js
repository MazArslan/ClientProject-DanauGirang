import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import ProjectCard from "./ProjectCard";

/*
  A list of all the projects in the database
*/
const AllProjects = () => {
  const [Projects, setProjects] = useState([]);
  const [Error, setError] = useState("");

  // Gets all projects from DB and adds them to state
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getProjects")
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <div>
      <Container>
        {Projects.map((project, index) => {
          return (
            <ProjectCard
              key={project._id || index}
              _id={project._id}
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

export default AllProjects;
