import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from "reactstrap";
import propTypes from "prop-types";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CaptureEventForm from "../CaptureEventForm/CaptureEventForm";
import PaginationButton from "../../../components/UI/PaginationButton/PaginationButton";
import "./ImageCard.css";

/**
 * ImageCard component
 * Handles the capture event form modal functionality
 * @param { 
    cardId,
    projectId,
    tags,
    totalCaptureEvents,
    pageNumber,
    pageSize,
    captureEventsId,
    isOpen,
    toggle } props
 */
const ImageCardModal = props => {
  const {
    cardId,
    projectId,
    tags,
    totalCaptureEvents,
    pageNumber,
    pageSize,
    captureEventsId,
    isOpen,
    toggle
  } = props;
  const [currentCardId, setCurrentCardId] = useState();
  const [captureEventId, setCaptureEventId] = useState();
  const [captureEventIndex, setCaptureEventIndex] = useState();
  const [forwardIsDisabled, setForwardIsDisabled] = useState();
  const [backIsDisabled, setBackIsDisabled] = useState();
  const history = useHistory();

  const retrieveCaptureEventId = (cardNo, pageNo, size, captureEvents) => {
    // Calculates the index of the selected card in relation to it's index within the current page
    const pageIndex = pageNo - 1;
    const numPriorCapEvents = pageIndex * size;
    const index = cardNo - numPriorCapEvents - 1;
    setCaptureEventIndex(index);
    const id = captureEvents[index];
    return id;
  };

  // Sets the current card as the selected image grid thumbnail
  useEffect(() => {
    setCurrentCardId(cardId);
  }, [cardId]);

  useEffect(() => {
    const retrievedCaptureEvent = retrieveCaptureEventId(
      currentCardId,
      pageNumber,
      pageSize,
      captureEventsId
    );
    setCaptureEventId(retrievedCaptureEvent);
  }, [currentCardId, pageNumber, pageSize, captureEventsId]);

  // Handles enabling and disabling the buttons used to navigate the image cards
  useEffect(() => {
    const cardNumber = captureEventIndex + 1;
    const value = totalCaptureEvents < pageSize ? totalCaptureEvents : pageSize;
    if (value === 1) {
      setForwardIsDisabled(true);
      setBackIsDisabled(true);
    } else if (cardNumber >= value) {
      setForwardIsDisabled(true);
      setBackIsDisabled(false);
    } else if (cardNumber <= 1) {
      setForwardIsDisabled(false);
      setBackIsDisabled(true);
    } else if (cardNumber <= value && cardNumber >= 1) {
      setForwardIsDisabled(false);
      setBackIsDisabled(false);
    }
  }, [captureEventIndex, pageSize, totalCaptureEvents]);

  // Triggered when confirmation modal submit button clicked
  const modalSubmissionHandler = useCallback(
    e => {
      e.preventDefault();
      const nextCard = currentCardId + 1;
      if (nextCard <= totalCaptureEvents) {
        setCurrentCardId(nextCard);
      }
    },
    [currentCardId, totalCaptureEvents]
  );

  // Pagination bar arrow click handler
  const handleArrowClick = useCallback((e, index) => {
    e.preventDefault();
    setCurrentCardId(index);
  }, []);

  let cardTitle = null;
  if (backIsDisabled !== undefined && forwardIsDisabled !== undefined) {
    cardTitle = (
      <Row>
        <Col className="text-left">
          <PaginationButton
            isDisabled={backIsDisabled}
            clicked={event => handleArrowClick(event, currentCardId - 1)}
            text={"<"}
          />
        </Col>
        <Col className="text-center">
          <h2>{`Image ${currentCardId}`}</h2>
        </Col>
        <Col className="text-right">
          <PaginationButton
            isDisabled={forwardIsDisabled}
            clicked={event => handleArrowClick(event, currentCardId + 1)}
            text={">"}
          />
        </Col>
      </Row>
    );
  }

  let form = null;
  if (captureEventId && currentCardId) {
    form = (
      <CaptureEventForm
        tags={tags}
        captureEventId={captureEventId}
        submitted={e => modalSubmissionHandler(e)}
      />
    );
  }

  const permalinkHandler = () => {
    history.push(`/project/${projectId}/capture-event/${captureEventId}/form`);
  };

  const linkIcon = (
    <Row>
      <Col className="text-centre" xs="auto" style={{ paddingRight: "8px" }}>
        <FontAwesomeIcon icon={faLink} className="link-icon" />
      </Col>
      <Col style={{ paddingLeft: "0px" }}>
        <p>Permalink</p>
      </Col>
    </Row>
  );

  return (
    <Modal style={{ maxWidth: "900px" }} isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} />
      <ModalBody>
        <React.Fragment>
          <div className="image-card">
            <Container>{cardTitle}</Container>
            <Container>
              <Row>
                <Col>
                  <Button
                    color="link"
                    onClick={() => permalinkHandler()}
                    className="permalink-button"
                  >
                    {linkIcon}
                  </Button>
                </Col>
              </Row>
            </Container>
            {form}
          </div>
        </React.Fragment>
      </ModalBody>
    </Modal>
  );
};

ImageCardModal.propTypes = {
  cardId: propTypes.number.isRequired,
  totalCaptureEvents: propTypes.number.isRequired,
  projectId: propTypes.string.isRequired,
  tags: propTypes.array.isRequired,
  captureEventsId: propTypes.array.isRequired,
  pageNumber: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  isOpen: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired
};

export default ImageCardModal;
