import React from "react";
import propTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

/**
 * Modal asking the user to confirm their action
 * @param { modal, toggle, onSubmit } props
 */
const confirmationModal = props => {
  const { modal, toggle, onSubmit } = props;
  return (
    <Modal style={{ zIndex: 2000 }} isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Submission confirmation</ModalHeader>
      <ModalBody>Are you sure you want to submit?</ModalBody>
      <ModalFooter>
        <Button className="cancel-button" color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button className="submit-button" color="success" onClick={onSubmit}>
          Yes, Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

confirmationModal.propTypes = {
  modal: propTypes.bool.isRequired,
  toggle: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired
};

export default confirmationModal;
