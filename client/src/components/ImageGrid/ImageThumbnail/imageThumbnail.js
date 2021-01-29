import React from "react";
import propTypes from "prop-types";
import { Row, Col, Card, CardImg } from "reactstrap";
import "./imageThumbnail.css";

/**
 * ImageThumbnail component
 * Converts the image binary of an image and  displays it as a thumbnail in a card
 * @param { id, image, cardId, dateTime, isComplete } props
 */
const imageThumbnail = props => {
  const { id, image, cardId, dateTime, isComplete } = props;

  const date = String(dateTime).substr(0, 10);

  return (
    <React.Fragment>
      <Card className="card">
        <div className="card-heading">
          <Row>
            <Col xs="2">
              <span className={`dot-${isComplete}`}></span>
            </Col>
            <Col xs="4">
              <b>{`Image ${cardId}`}</b>
            </Col>
            <Col sm={{ size: "auto", offset: 1 }}>
              <p>{date}</p>
            </Col>
          </Row>
        </div>
        <CardImg
          top
          width="20%"
          src={`/api/images/cameraTrap/${image.filePath}`}
          alt={`${id}`}
        />
      </Card>
    </React.Fragment>
  );
};

imageThumbnail.propTypes = {
  id: propTypes.string,
  image: propTypes.object.isRequired,
  cardId: propTypes.number,
  dateTime: propTypes.string,
  isComplete: propTypes.bool
};

export default imageThumbnail;
