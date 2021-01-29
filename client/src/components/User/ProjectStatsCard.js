import React from "react";
import propTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";

import "./ProjectStatsCardStyle.css";

const ProjectStatsCard = props => {
  return (
    <Card>
      <CardBody className="cardBody__text">
        <CardTitle>{props.chartName}</CardTitle>
        <h3>{props.statData}</h3>
      </CardBody>
    </Card>
  );
};

ProjectStatsCard.propTypes = {
  chartName: propTypes.string,
  statData: propTypes.object
};

export default ProjectStatsCard;
