import React from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

/**
 * Navbar component
 */
const navbar = () => {
  const logoutUser = () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/");
  };

  const navbarItems = (
    <Nav tabs>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Account
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Help</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => logoutUser()}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );

  return (
    <div>
      <Navbar color="dark" expand="md" style={{ paddingBottom: "0px" }}>
        <NavbarBrand style={{ color: "white" }}>Wildlife.DATA</NavbarBrand>
        {navbarItems}
      </Navbar>
    </div>
  );
};

export default navbar;
