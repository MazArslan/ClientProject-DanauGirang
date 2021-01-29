/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import LogRocket from "logrocket";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
// states AI statistics
const Statistics = () => {
  const [totalImages, setTotalImages] = useState();
  const [totalDetections, setTotalDetections] = useState();
  const [totalCorrect, setTotalCorrect] = useState();
  const [totalConfidence, setTotalConfidence] = useState();

  // card style for AI stats
  const cardStyle = {
    backgroundColor: "#3443eb",
    borderColor: "#3443eb",
    textAlign: "center"
  };
  // requesting AI statistics from DB
  useEffect(() => {
    async function getadStats() {
      axios
        .get("http://localhost:3000/api/getadStats")
        .then(res => {
          setTotalCorrect(res.data.numberCompleted);
          setTotalImages(res.data.numberOfEvents);
          setTotalDetections(res.data.numberOfDetections);
          setTotalConfidence(res.data.aiConfidenceMax);
        })
        .catch(error => LogRocket.captureException(error));
    }
    getadStats();
  }, []);

  return (
    <div>
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>
            <h2>AI statistics</h2>
          </CardTitle>
          <br></br>
          <CardText>Total Number of Captured Events = {totalImages}</CardText>
          <CardText>
            Total Number of AI animal detections = {totalCorrect}
          </CardText>
          <CardText>Total Number of AI Checks = {totalDetections}</CardText>
          <CardText>
            {totalConfidence &&
              totalConfidence.map((item, i) => {
                const k = Object.keys(item)[0];
                return (
                  <h3>Average Total Confidence of AI = {item[k] * 100}%</h3>
                );
              })}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Statistics;
