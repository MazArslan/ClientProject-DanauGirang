import React from "react";
import propTypes from "prop-types";

const ProjectStatsTitle = props => {
  return (
    <div className="section__title">
      <div className="section__title--border-large"></div>
      <h2 className="section__title--text">{props.title}</h2>
      <div className="section__title--border-small"></div>
    </div>
  );
};

ProjectStatsTitle.propTypes = {
  title: propTypes.string
};

export default ProjectStatsTitle;
