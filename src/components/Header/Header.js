import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../App";
import './Header.css';
const Header = () => {
  const [loggedIn, setLoggedIn] = useContext(userContext);
  const { isLoggedIn} = loggedIn;
  //Sign Out User
  const logOutUser = () => {
      firebase.auth().signOut().then(() => {
          const logoutUser = { ...loggedIn }
          logoutUser.isLoggedIn = false;
          logoutUser.error = '';
          setLoggedIn(logoutUser);
      }).catch((error) => {
          console.log(error.message);
      });
  }

  return (
    <Container >
    <div className="col-md-12">
    <Navbar variant="light col-md-12">
    <Link to = "/home"> 
        <Navbar.Brand className="main-title"> Old Egg </Navbar.Brand>  </Link>
        <Nav className="ml-auto">
          <NavLink to="/home" className="mr-4 navItem">Home</NavLink>
          <NavLink to="/Order" className="mr-4 navItem">Order</NavLink>
          <Dropdown >
            <Dropdown.Toggle className="login-btn mr-2" variant="success" id="dropdown-basic">
              Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item> <Link to="/manageProduct">Manage Product</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/addProduct">Add Product</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {
            isLoggedIn
            ? <Link to="/login"><Button onClick={logOutUser} className="login-btn">Logout</Button></Link>
            : <Link to="/login"><Button className="login-btn">Login</Button></Link>
          }
        </Nav>
      </Navbar>
    </div>
    </Container>
  );
};

export default Header;
