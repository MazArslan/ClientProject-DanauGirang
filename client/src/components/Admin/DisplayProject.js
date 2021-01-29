import React from "react";
import propTypes from "prop-types";
import ProjectCard from "./ProjectCard";

// Display project card
const DisplayProject = props => {
  return (
    <div>
      <ProjectCard
        _id={props._id}
        name={props.name}
        type={props.type}
        details={props.details}
        description={props.description}
        users={props.users}
        tags={props.tags}
      />
    </div>
  );
};

DisplayProject.propTypes = {
  _id: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  details: propTypes.string,
  description: propTypes.string,
  users: propTypes.array,
  tags: propTypes.array
};

export default DisplayProject;
