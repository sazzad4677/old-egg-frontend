import React, { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Header from "../Header/Header";
import ManageProduct from "../ManageProduct/ManageProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./AddProduct.css";
import AddProductForm from "./AddProductForm";

const AddProduct = () => {

  return (
    <div className="product" md={12}>
      <Header></Header>
      <Container className="products">
        <h3>Add Product</h3>
        <AddProductForm></AddProductForm>
        {/* <ManageProduct></ManageProduct> */}
      </Container>
    </div>
  );
};

export default AddProduct;
