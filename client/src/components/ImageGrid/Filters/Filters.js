import React from "react";
import { Row, Col, Input, Button } from "reactstrap";
import propTypes from "prop-types";

/**
 * Filter component
 * Form elements for the filter functionality in the ImageGrid component
 * @param { filterChoice, clearFilters, dateChange, statusChange, applyFilters } props
 */
const filters = props => {
  const {
    filterChoice,
    clearFilters,
    dateChange,
    statusChange,
    applyFilters
  } = props;

  return (
    <React.Fragment>
      <Row>
        <Col xs="3">
          <Row>
            <Col>
              <p>Capture date</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="date"
                name="date"
                placeholder="date placeholder"
                onChange={dateChange}
              />
            </Col>
          </Row>
        </Col>
        <Col xs="3">
          <Row>
            <Col>
              <p>Completion status</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="select"
                name="select"
                value={filterChoice.completionStatus}
                onChange={statusChange}
              >
                <option value="empty">All cards</option>
                <option value="complete">Completed cards</option>
                <option value="incomplete">Incomplete cards</option>
              </Input>
            </Col>
          </Row>
        </Col>
        <Col xs="2">
          {/* Used to add an empty row in order to maintain button positioning */}
          <Row>
            <Col>
              <p>
                <br />
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button outline color="primary" onClick={applyFilters}>
                Apply filters
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs="4">
          {/* Used to add an empty row in order to maintain button positioning */}
          <Row>
            <Col>
              <p>
                <br />
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button outline color="danger" onClick={clearFilters}>
                Clear filters
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

filters.propTypes = {
  filterChoice: propTypes.object.isRequired,
  clearFilters: propTypes.func.isRequired,
  applyFilters: propTypes.func.isRequired,
  dateChange: propTypes.func.isRequired,
  statusChange: propTypes.func.isRequired
};

export default filters;
