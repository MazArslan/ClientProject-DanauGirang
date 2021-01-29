import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label
} from "reactstrap";
import axios from "axios";
import { deleteProject } from "../../../components/Admin/DeleteProject";
import { updateProject } from "../../../components/Admin/UpdateProject";

const ProjectDetailsModal = props => {
  // Toggles Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Form State and handling errors on submission
  const [loading, setLoading] = React.useState(true);
  const { handleSubmit, register, errors } = useForm();
  const [items, setItems] = React.useState([
    { label: "Loading", value: "Loading" }
  ]);

  const [Name, setName] = useState(props.name);
  const [Type, setType] = useState(props.type);
  const [Details, setDetails] = useState(props.details);
  const [Description, setDescription] = useState(props.description);
  const [Users, setUsers] = useState(props.users);
  const [Tags, setTags] = useState(props.tags);

  // Runs when user confirms changes
  const onSubmit = () => {
    updateProject(props._id, Name, Type, Details, Description, Users, Tags);
    toggle();
  };

  const deletedProject = () => {
    deleteProject(props._id);
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
      <Button color="secondary" onClick={toggle}>
        Edit Project
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Project Name: </Label>
              <br></br>
              <input
                type="text"
                name="name"
                defaultValue={Name}
                onChange={e => setName(e.target.value)}
                ref={register({ required: true, maxLength: 30 })}
              />
              {errors.name &&
                " Project name is required or is too long (maximum 30 characters). Try for example, Project Wildlife"}
            </FormGroup>
            <FormGroup>
              <Label for="type">Project Type: </Label>
              <br></br>
              <input
                id="type"
                type="text"
                name="type"
                defaultValue={Type}
                onChange={e => setType(e.target.value)}
                ref={register({ required: true, maxLength: 20 })}
              />
              {errors.type &&
                " Project type is required or is too long (maximum 20 characters). Try for example, CAMERA_TRAP"}
            </FormGroup>
            <FormGroup>
              <Label for="details">
                Project Details ( max 20 characters):{" "}
              </Label>
              <br></br>
              <input
                id="details"
                type="text"
                name="details"
                defaultValue={Details}
                onChange={e => setDetails(e.target.value)}
                ref={register({ required: true, maxLength: 20 })}
              />
              {errors.details && " Project detail did not meet the requirement"}
            </FormGroup>
            <FormGroup>
              <Label for="description">Project Description: </Label>
              <br></br>
              <input
                id="description"
                type="text"
                name="description"
                defaultValue={Description}
                onChange={e => setDescription(e.target.value)}
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
                id="users"
                disabled={loading}
                defaultValue={Users}
                onChange={e => setUsers(e.target.value)}
                ref={register({ required: true })}
                multiple
              >
                {items.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.users && " Please select at least one user"}
            </FormGroup>
            <FormGroup>
              <Label for="tags">
                Project Tags: (use a comma (,) to separate out tags){" "}
              </Label>
              <br></br>
              <input
                type="text"
                name="tags"
                id="tags"
                disabled={loading}
                defaultValue={Tags}
                onChange={e => setTags(e.target.value)}
                ref={register({ required: true })}
              />
              {errors.tags && " Project tag is required"}
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Confirm Changes
          </Button>
          <Button color="danger" onClick={deletedProject}>
            Delete Project
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

ProjectDetailsModal.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
  details: propTypes.string,
  description: propTypes.string,
  _id: propTypes.string,
  users: propTypes.array.isRequired,
  tags: propTypes.array.isRequired
};

export default ProjectDetailsModal;
