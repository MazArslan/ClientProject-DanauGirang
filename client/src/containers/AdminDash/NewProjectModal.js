import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import LogRocket from "logrocket";

const addProj = {
  textAlign: "center",
  margin: "0",
  position: "relative",
  top: "50%",
  left: "35%",
  width: "30%",
  height: "50px"
};

const NewProject = () => {
  // Toggles modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // State for form and contents
  const [loading, setLoading] = React.useState(true);
  const { handleSubmit, register, errors } = useForm();
  const [items, setItems] = React.useState([
    { label: "Loading", value: "Loading" }
  ]);

  // Runs on form submission
  // Split tags values
  const onSubmit = values => {
    // eslint-disable-next-line no-param-reassign
    values.tags = values.tags.split(",");
    axios.post("http://localhost:3000/api/addProject", values);
    toggle();
  };

  useEffect(() => {
    // initialised as false
    let unmounted = false;
    async function getUsers() {
      axios
        .get("http://localhost:3000/api/Users/findUser")
        .then(res => {
          if (!unmounted) {
            setItems(
              res.data.map(({ name, _id }) => ({
                label: name,
                value: _id
              }))
            );
            setLoading(false);
            // setLoading allows change to option - data displayed
          }
        })
        .catch(error => LogRocket.captureException(error));
    }
    // controls dropdown feature after obtaining values
    getUsers();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <Button style={addProj} outline color="primary" onClick={toggle}>
        Add New Project
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Project</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Project Name: </Label>
              <br></br>
              <input
                type="text"
                name="name"
                ref={register({ required: true, maxLength: 30 })}
              />
              {errors.name &&
                " Project name is required or is too long (maximum 30 characters). Try for example, Project Wildlife"}
            </FormGroup>
            <FormGroup>
              <Label for="type">Project Type: </Label>
              <br></br>
              <input
                type="text"
                name="type"
                ref={register({ required: true, maxLength: 20 })}
              />
              {errors.type &&
                " Project type is required or is too long (maximum 20 characters). Try for example, CAMERA_TRAP"}
            </FormGroup>
            <FormGroup>
              <Label for="details">Project Detail: </Label>
              <br></br>
              <input
                type="text"
                name="details"
                ref={register({ required: true, maxLength: 20 })}
              />
              {errors.details &&
                " Project name is required or is too long ( maximum 20 characters)."}
            </FormGroup>
            <FormGroup>
              <Label for="description">Project Description: </Label>
              <br></br>
              <input
                type="text"
                name="description"
                ref={register({ required: true, maxLength: 140 })}
              />
              {errors.description &&
                " Project description is required or is too long ( maximum 140 characters)."}
            </FormGroup>
            <FormGroup>
              <Label for="users">Add User/Users </Label>
              <br></br>
              <select
                name="users"
                disabled={loading}
                ref={register({ required: true })}
                multiple
              >
                {items.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.users && " Please select a user"}
            </FormGroup>
            <FormGroup>
              <Label for="tags">
                Project Tags: (use a comma (,) to separate out tags){" "}
              </Label>
              <br></br>
              <input
                type="text"
                name="tags"
                ref={register({ required: true })}
              />
              {errors.tags && " Project tag is required"}
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Add New Project
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

export default NewProject;
