import React, { useState } from "react";
import propTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { deleteUser } from "../../../components/Admin/DeleteUser";
import { updateUser } from "../../../components/Admin/UpdateUser";
import { validateEmail } from "../../../components/Auth/Login/Validation/EmailValidation";

const MoreDetailsModal = props => {
  // Toggles Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Form State
  const [Name, setName] = useState(props.name);
  const [Email, setEmail] = useState(props.email);
  const [isAdmin, setisAdmin] = useState(props.isAdmin);
  const [isActive, setisActive] = useState(props.isActive);
  const [Error, setError] = useState("");

  // Validation conditions
  const valid = Name && Email != null;
  const validEmail = validateEmail(Email);

  // Runs when user confirms changes
  const handleUpdateSubmit = () => {
    setError("");
    if (valid) {
      if (validEmail) {
        updateUser(props._id, Name, Email, isAdmin, isActive);
        toggle();
      } else {
        setError("Invalid email address");
      }
    } else {
      setError("Empty Fields");
    }
  };

  const deletedUser = () => {
    deleteUser(props._id);
    toggle();
  };

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        Edit User
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Full name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={Name}
                onChange={e => {
                  setName(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input
                id="email"
                type="text"
                defaultValue={Email}
                onChange={e => setEmail(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectAdmin">Admin privileges?</Label>
              <Input
                type="select"
                name="select"
                id="selectAdmin"
                defaultValue={isAdmin}
                onChange={e => setisAdmin(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectActive">Account Active?</Label>
              <Input
                type="select"
                name="select"
                id="selectActive"
                defaultValue={isActive}
                onChange={e => setisActive(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleUpdateSubmit()}>
            Confirm Changes
          </Button>
          <Button color="danger" onClick={deletedUser}>
            Delete User
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
        <ModalFooter>
          <p>{Error}</p>
        </ModalFooter>
      </Modal>
    </div>
  );
};

MoreDetailsModal.propTypes = {
  name: propTypes.string,
  email: propTypes.string,
  isAdmin: propTypes.bool,
  isActive: propTypes.bool,
  _id: propTypes.string
};

export default MoreDetailsModal;
