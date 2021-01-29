import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import propTypes from "prop-types";

import useHttp from "../../../hooks/http";
import { updateObject } from "../../../shared/utility";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Image from "../../../components/UI/Image/Image";
import AIImage from "../../../components/UI/AIImage/AIImage";
import RadioGroup from "../../../components/UI/RadioGroup/RadioGroup";
import ConfirmationModal from "../../../components/UI/ConfirmationModal/ConfirmationModal";

/**
 * Capture event form component
 * The form for the user to add information about a capture event
 * @param { tags, captureEventId, submitted } props
 */
const CaptureEventForm = props => {
  const { tags, captureEventId, submitted } = props;

  const [modal, setModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState();
  const [aiImages, setAIImages] = useState();
  const { isLoading, error, data, sendRequest } = useHttp();

  // Form input state
  const [radioButtonForm, setRadioButtonForm] = useState({});
  const [checkboxes, setCheckboxes] = useState([]);
  const [textAreaForm, setTextAreaForm] = useState("");

  useEffect(() => {
    // Retrive images for the current card
    // If statement prevents bug where request is made with NaN values
    if (captureEventId !== undefined) {
      sendRequest(
        `http://localhost:3000/api/captureEvent/${captureEventId}/form`,
        "GET"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureEventId]);

  useEffect(() => {
    // Add the retrieved images into state
    if (data !== null && !data.error && data.capturedImage) {
      setCapturedImage(data.capturedImage);
      setAIImages(data.aiImages);
      if (data.captureEvent !== null) {
        setTextAreaForm(data.captureEvent.notes);
        setCheckboxes(data.captureEvent.tags);
      }
    }
  }, [data]);

  const inputChangedHandler = event => {
    setTextAreaForm(event.target.value);
  };

  const clearAllFormData = () => {
    setRadioButtonForm({});
    setCheckboxes([]);
    setTextAreaForm("");
  };

  // Triggered when image card submit button clicked
  const cardSubmissionHandler = e => {
    e.preventDefault();
    setModal(true);
  };

  const addImageCardHandler = useCallback(
    (eventId, aiCheck, assignedTags, text) => {
      const body = {};
      body.aiCheck = aiCheck;
      body.tags = assignedTags;
      body.notes = text;
      sendRequest(
        `http://localhost:3000/api/captureEvent/${eventId}/form`,
        "POST",
        JSON.stringify(body)
      );
    },
    [sendRequest]
  );

  const form = (
    <Form onSubmit={cardSubmissionHandler} className="textarea-form">
      <Row>
        <Col xs="2" />
        <Col className="text-center" lg="8">
          <FormGroup>
            <Label for="notesText">Enter additional notes:</Label>
            <Input
              type="textarea"
              name="text"
              id="notesText"
              value={textAreaForm}
              onChange={e => inputChangedHandler(e)}
            />
          </FormGroup>
        </Col>
        <Col xs="2" />
      </Row>
      <Button className="submit-button" name="submit" color="success">
        Submit
      </Button>
    </Form>
  );

  const onCheckboxBtnClick = selected => {
    const index = checkboxes.indexOf(selected);
    if (index < 0) {
      checkboxes.push(selected);
    } else {
      checkboxes.splice(index, 1);
    }
    setCheckboxes([...checkboxes]);
  };

  const tagsForm = (
    <React.Fragment>
      <Col className="text-center">
        <ButtonGroup>
          {tags.map(tag => (
            <Button
              outline
              key={`${tag}`}
              color="primary"
              onClick={() => onCheckboxBtnClick(`${tag}`)}
              active={checkboxes.includes(`${tag}`)}
            >
              {tag}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
    </React.Fragment>
  );

  let originalImage = null;
  if (capturedImage !== undefined) {
    originalImage = (
      <React.Fragment>
        <Image filePath={capturedImage.filePath} id={capturedImage._id} />
      </React.Fragment>
    );
  }

  const handleRadioElementChange = useCallback(
    (e, id) => {
      const updatedRadioForm = updateObject(radioButtonForm, {
        [id]: e.target.value
      });
      setRadioButtonForm(updatedRadioForm);
    },
    [radioButtonForm]
  );

  // let imagesForm = error ? <p>Images cannot be loaded</p> : <Spinner />;
  let imagesForm = error ? <p>Images cannot be loaded</p> : <Spinner />;
  if (aiImages && !isLoading) {
    imagesForm = (
      <React.Fragment>
        {aiImages.map(image => {
          let aiTitle = null;
          if (image.type === "MICROSOFT_AI") {
            aiTitle = (
              <Row>
                <Col className="text-center">
                  <p>
                    <b>Microsoft MegaDetector AI image</b>
                  </p>
                </Col>
              </Row>
            );
          }
          return (
            <div key={image._id}>
              {aiTitle}
              <AIImage
                filePath={image.filePath}
                detections={image.detections}
              />
              <Row>
                <Col className="text-center">
                  <p>Has the AI correctly identified all of the animals?</p>
                </Col>
              </Row>
              <RadioGroup
                aiId={image._id}
                radioButtonForm={radioButtonForm}
                selectedButtonChanged={e =>
                  handleRadioElementChange(e, image._id)
                }
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  const formSubmissionHandler = e => {
    e.preventDefault();
    addImageCardHandler(
      captureEventId,
      radioButtonForm,
      checkboxes,
      textAreaForm
    );
    if (submitted != null) {
      submitted(e);
    }
    clearAllFormData();
    setModal(false);
  };

  // Confirmation modal toggle handler
  const toggleModal = useCallback(
    e => {
      e.preventDefault();
      setModal(!modal);
    },
    [modal]
  );

  let confirmationModal = null;
  if (modal) {
    confirmationModal = (
      <ConfirmationModal
        modal={modal}
        toggle={toggleModal}
        onSubmit={e => formSubmissionHandler(e)}
      />
    );
  }

  return (
    <React.Fragment>
      <Container>
        {confirmationModal}
        <div className="capture-event-form">
          {originalImage}
          {imagesForm}
          <Row>
            <Col className="text-center">
              <p>Select appropriate tags for the image:</p>
            </Col>
          </Row>
          <Row>{tagsForm}</Row>
          <Row>
            <Col className="text-center">{form}</Col>
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
};

CaptureEventForm.propTypes = {
  tags: propTypes.array.isRequired,
  captureEventId: propTypes.string.isRequired,
  submitted: propTypes.func
};

export default CaptureEventForm;
