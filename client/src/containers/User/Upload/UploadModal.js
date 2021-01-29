import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import propTypes from "prop-types";

import UploadModalBody from "./UploadModalBody";
import "./uploadModal.css";

const UploadModal = props => {
  // Toggles Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle}>Upload Images</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload</ModalHeader>
        <ModalBody>
          <UploadModalBody projectID={props.projectID} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

UploadModal.propTypes = {
  projectID: propTypes.string
};

export default UploadModal;
