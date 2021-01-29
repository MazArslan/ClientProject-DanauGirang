import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";

import OwnProjects from "./OwnProjects";
import AllProjects from "./AllProjects";

/** CSS File for Switch */
// eslint-disable-next-line no-unused-vars
import SwitchStyle from "./SwitchStyle.css";

/** The checkbox switch for setting the own projects filter */
const Switch = () => {
  const [checkBoxState, setCheckBoxState] = useState(false);

  const handleChange = () => {
    setCheckBoxState(!checkBoxState);
  };

  /** Sets the list that should be displayed, depending on what the user whats. */
  let list;
  if (checkBoxState) {
    list = <OwnProjects></OwnProjects>;
  } else {
    list = <AllProjects></AllProjects>;
  }
  return (
    <div>
      <Container fluid className="userDash_heading">
        <Row>
          <Col className="userDash_heading--title">
            <h2 className="userDash_heading--title">
              {checkBoxState ? "Own Projects" : "All Projects"}
            </h2>
          </Col>
          <Col>
            {/* REFERENCED CODE SNIPPET BELOW
              Code has been adapted to fit logic
              URL: https://www.w3schools.com/howto/howto_css_switch.asp
              Date Accessed: 05 April 2020 */}
            <label className="switch">
              <input type="checkbox" onChange={() => handleChange()} />
              <span className="slider round"></span>
            </label>
            {/* END OF REFERENCED CODE SNIPPET */}
            {checkBoxState ? "SEE ALL PROJECTS" : "SEE OWN PROJECTS"}
          </Col>
        </Row>
      </Container>
      <div>{list}</div>
    </div>
  );
};

export default Switch;
