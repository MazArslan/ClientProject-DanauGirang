import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateProject = () => {
  const [loading, setLoading] = React.useState(true);
  const { handleSubmit, register, errors } = useForm();
  const [items, setItems] = React.useState([
    { label: "Loading", value: "Loading" }
  ]);
  // onSubmit for sending values from form
  const onSubmit = values => {
    axios
      .post("http://localhost:3000/api/addProject/addProject", values)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
      });
  };
  useEffect(() => {
    // initialise as false
    let unmounted = false;
    async function getUsers() {
      axios
        .get("http://localhost:3000/api/findUser/findUser")
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
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
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
    }
    // controls dropdown feature after obtaining values
    getUsers();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="ProjectName"
        name="name"
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.projectName && " Project name is required"}
      <input
        type="text"
        placeholder="Project Details"
        name="details"
        ref={register({ required: true, maxLength: 50 })}
      />
      {errors.projectDetail && " Project details are required"}
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
        {errors.User && <p>No user found</p>}
      </select>
      <input type="submit" />
    </form>
  );
};

export default CreateProject;
