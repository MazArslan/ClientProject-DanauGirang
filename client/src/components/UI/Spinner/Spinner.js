import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

/**
 * Spinner component
 * Displays a loading spinner
 * Defaults to text if styling fails
 */
const spinner = () => (
  <Container>
    <Row>
      <Col className="text-center">
        <Spinner style={{ width: "3rem", height: "3rem" }}>Loading...</Spinner>
      </Col>
    </Row>
  </Container>
);

export default spinner;
