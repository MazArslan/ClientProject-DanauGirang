import React from "react";
import propTypes from "prop-types";
import "./pageCount.css";

/**
 * PageCount component.
 * Displays text informing user of their current page and the total number of pages
 * @param { currentPage, totalPages } props
 */
const pageCount = props => {
  const { currentPage, totalPages } = props;

  return (
    <React.Fragment>
      <div className="counter">
        <p>
          <i>
            Page {currentPage} out of {totalPages}
          </i>
        </p>
      </div>
    </React.Fragment>
  );
};

pageCount.propTypes = {
  currentPage: propTypes.string.isRequired,
  totalPages: propTypes.string.isRequired
};

export default pageCount;
