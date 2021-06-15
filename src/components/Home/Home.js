import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Products from "../Products/Products";
import "./Home.css";
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
