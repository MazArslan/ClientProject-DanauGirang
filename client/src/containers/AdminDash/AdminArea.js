import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "reactstrap";
import DisplayUser from "../../components/Admin/DisplayUser";
import NewUser from "./CreateUserModal";
import NewProject from "./NewProjectModal";
import DisplayProject from "../../components/Admin/DisplayProject";
// Dashboard heading
const aDash = {
  textAlign: "center",
  margin: "0",
  position: "relative",
  top: "50%",
  left: "35%",
  width: "30%",
  height: "50px",
  color: "#00001a"
};

const AdminArea = () => {
  const [Users, setUsers] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [error, setError] = useState();

  // retrieve users API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  // retrieve projects API
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
      <h1 style={aDash}>Dashboard</h1>
      <br></br>
      <LinkContainer to={`/Map`}>
        <Button style={aDash}>View Map Page</Button>
      </LinkContainer>
      <br></br>
      <br></br>
      <LinkContainer to={`/Statistics`}>
        <Button style={aDash}>View AI statistics</Button>
      </LinkContainer>
      <div>
        <NewUser />
      </div>
      <br></br>
      <div>
        <NewProject />
      </div>
      <br></br>
      <h2 align="center">Users</h2>
      <div>
        {Users.map(user => (
          <DisplayUser
            key={user._id}
            _id={user._id}
            name={user.name}
            email={user.email}
            isAdmin={user.isAdmin}
            isActive={user.isActive}
          />
        ))}
      </div>
      <br></br>
      <h2 align="center">Projects</h2>
      <div>
        {Projects.map((project, index) => (
          <DisplayProject
            key={project._id || index}
            _id={project._id}
            name={project.name}
            type={project.type}
            description={project.description}
            details={project.details}
            users={project.users}
            tags={project.tags}
          />
        ))}
      </div>
      <h4>{error}</h4>
    </div>
  );
};

export default AdminArea;
