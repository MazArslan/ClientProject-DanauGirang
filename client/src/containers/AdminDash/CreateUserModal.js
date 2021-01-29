import React, { useState } from "react";
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

import { validateEmail } from "../../components/Auth/Login/Validation/EmailValidation";
import { addUser } from "../../components/Admin/AddUser";

const addUs = {
  textAlign: "center",
  margin: "0",
  position: "relative",
  top: "50%",
  left: "35%",
  width: "30%",
  height: "50px"
};
const NewUser = () => {
  // Toggles modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Form state
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [Error, setError] = useState("");

  // Validation conditions
  const FormValid = Name && Email != null;
  const PassValid = Password != null;
  const EmailValid = validateEmail(Email);

  const clearAllFormData = () => {
    setPassword("");
    setName("");
    setisAdmin([]);
    setEmail("");
    setisActive([]);
  };

  // Runs on form submission
  const newUser = () => {
    if (FormValid && PassValid) {
      if (EmailValid) {
        addUser(Name, Email, Password, isAdmin, isActive);
        toggle();
        clearAllFormData();
      } else {
        setError("Invalid Email");
      }
    } else {
      setError("Empty Fields");
    }
  };

  return (
    <div>
      <Button style={addUs} outline color="primary" onClick={toggle}>
        Add New User
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="selectAdmin">
                Will this user have admin privileges?
              </Label>
              <Input
                type="select"
                name="select"
                id="selectAdmin"
                onChange={e => setisAdmin(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectActive">Will this account be active?</Label>
              <Input
                type="select"
                name="select"
                id="selectActive"
                onChange={e => setisActive(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => newUser()}>
            Add New User
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

export default NewUser;
