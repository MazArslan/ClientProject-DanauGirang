import React from "react";
import propTypes from "prop-types";
import "../../index.css";

import Navbar from "../../components/Navigation/Navbar/Navbar";

const layout = props => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

export default layout;

layout.propTypes = {
  children: propTypes.object
};
