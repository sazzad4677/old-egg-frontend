import React from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import Header from "../Header/Header";
import "./Home.css";


import Products from "../Products/Products";

const Home = () => {
  return (
    <div>
      
      
      <Header></Header>
      <Container>
        
        <div className="col-md-12 mt-5">
          <Products></Products>
        </div>
      </Container>
    </div>
  );
};

export default Home;
