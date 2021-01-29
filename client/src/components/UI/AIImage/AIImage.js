import React, { useEffect } from "react";
import propTypes from "prop-types";
import { Container, Col, Row } from "reactstrap";
import "./Image.css";

/**
 * AIImage component
 * Renders a canvas that has the image with the AI detections overlay
 */
const AIImage = props => {
  const { detections, filePath } = props;

  const canvasRef = React.createRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const getUrl = `/api/images/cameraTrap/${filePath}`;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      detections.forEach(detection => {
        const border = detection.bbox;
        const bboxXPos = border[0] * img.width;
        const bboxYPos = border[1] * img.height;
        const bboxWidth = border[2] * img.width;
        const bboxHeight = border[3] * img.height;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.rect(bboxXPos, bboxYPos, bboxWidth, bboxHeight);
        ctx.stroke();
      });
    };
    // Async fetch the image and trigger the onload callback when image is received
    img.src = getUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath, detections]);

  return (
    <div className="text-center">
      <Container className="image-component">
        <Row>
          <Col className="text-center">
            <canvas ref={canvasRef} className="canvasElement" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

AIImage.propTypes = {
  filePath: propTypes.string.isRequired,
  detections: propTypes.array
};

export default AIImage;
