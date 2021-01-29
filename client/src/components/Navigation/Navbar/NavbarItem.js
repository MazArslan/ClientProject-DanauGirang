import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import propTypes from "prop-types";

/**
 * Navbar item component
 * @param {route, label} props
 */
const navbarItem = props => (
  <NavItem>
    <NavLink tag={RRNavLink} exact to={props.route}>
      {props.label}
    </NavLink>
  </NavItem>
);

navbarItem.propTypes = {
  route: propTypes.string.isRequired,
  label: propTypes.string.isRequired
};

export default navbarItem;
