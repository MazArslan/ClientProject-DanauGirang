import React, { useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

import { Row, Col } from "reactstrap";
import StatCard from "../../../components/User/ProjectStatsCard";

const StatsSection = props => {
  const [totalImages, setTotalImages] = useState();
  const [totalDetections, setTotalDetections] = useState();
  const [totalCorrect, setTotalCorrect] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getStats", {
        params: { projectID: props.projectID }
      })
      .then(res => {
        setTotalCorrect(res.data.numberCompleted);
        setTotalImages(res.data.numberOfEvents);
        setTotalDetections(res.data.numberOfDetections);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  });

  return (
    <Row>
      <Col>
        <StatCard
          chartName="Total Images in Project: "
          statData={totalImages}
        />
      </Col>
      <Col>
        <StatCard
          chartName="Total Animal Detections: "
          statData={totalDetections}
        />
      </Col>
      <Col>
        <StatCard chartName="AI Images Confirmed: " statData={totalCorrect} />
      </Col>
    </Row>
  );
};

StatsSection.propTypes = {
  projectID: propTypes.string
};

export default StatsSection;
