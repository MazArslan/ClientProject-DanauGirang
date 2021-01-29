import React from "react";
import propTypes from "prop-types";
import { Button } from "reactstrap";
import "./PaginationButton.css";

/**
 * Specialised button component for allowing users to navigate between image card components
 * @param { isDisabled, clicked, text } props
 */
const paginationButton = props => {
  const { isDisabled, clicked, text } = props;
  return (
    <Button
      className="arrow-button"
      disabled={isDisabled}
      outline
      color="info"
      onClick={clicked}
    >
      {text}
    </Button>
  );
};

paginationButton.propTypes = {
  isDisabled: propTypes.bool.isRequired,
  clicked: propTypes.func.isRequired,
  text: propTypes.string.isRequired
};

export default paginationButton;
