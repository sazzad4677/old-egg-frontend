import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
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
