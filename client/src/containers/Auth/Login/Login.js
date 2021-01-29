import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import LoginSubmit from "../../../components/Auth/Login/Validation/LoginSubmit";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Form className="yese">
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
      </Form>
      <div>
        <LoginSubmit email={email} password={password} />
      </div>
    </div>
  );
};

export default Login;
