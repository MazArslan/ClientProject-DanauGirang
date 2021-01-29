import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";

import { loginUser } from "../LoginAPI";
import { validateEmail } from "./EmailValidation";

const LoginSubmit = props => {
  // Get props
  const { email } = props;
  const { password } = props;

  // If no empty fields and email is valid, display the submit button to the user
  const noEmptyFields = props.email && props.password !== "";
  const validEmail = validateEmail(props.email);
  let submitButton = null;

  if (noEmptyFields && validEmail) {
    submitButton = (
      <Button color="success" onClick={() => loginUser(email, password)}>
        Submit
      </Button>
    );
  } else {
    submitButton = <Button>Invalid credentials</Button>;
  }

  return <div>{submitButton}</div>;
};

LoginSubmit.propTypes = {
  email: propTypes.string,
  password: propTypes.string
};

export default LoginSubmit;
