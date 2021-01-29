import React from "react";
import propTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import "./Image.css";

/**
 * Image component
 * Renders an image
 * @param { filePath, id } props
 */
const image = props => {
  // eslint-disable-next-line no-unused-vars
  const { filePath, id } = props;
  return (
    <Container className="image-component">
      <Row key={image._id}>
        <Col className="text-center">
          <img
            src={`/api/images/cameraTrap/${filePath}`}
            alt={`${id}`}
            style={{ maxHeight: "600px", maxWidth: "720px" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

image.propTypes = {
  filePath: propTypes.string.isRequired,
  id: propTypes.string
};

export default image;
