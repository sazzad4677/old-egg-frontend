import React, { useEffect, useState } from "react";
import { Col, Container, Navbar, Row, Table, Button } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./ManageProduct.css";
import Header from "../Header/Header";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData()
  }, []);
  const getData = () => {
    fetch("https://glacial-mesa-63021.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }
  const deleteProduct = (id) => {

    if(window.confirm("Are you sure you want to delete")){
     
    fetch("https://glacial-mesa-63021.herokuapp.com/deleteProduct/" + id, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
    .then ((res) => res.json())
    .then(()=>  getData());
    }
  };
  
  return (
    <div className="manageProduct">
      <Header></Header>
      <Row>
        <Col md="auto">
          {/* <Sidebar></Sidebar> */}
        </Col>
        <Col>
          <Container
            className="tableContainer"
            style={{ backgroundColor: "white", borderRadius: "20px" }}>
              <h3 className="mt-5">Manage Product</h3>
            <Table responsive borderless className=" mt-3 table"> 
              <thead style={{ backgroundColor: "#F5F6FA" }}>
                <tr>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>{product.productName}</td>
                    <td>{product.brandName}</td>
                    <td>${product.productPrice}</td>
                    <td>
                      <AiFillEdit className="edit-icon" />{" "}
                      <AiFillDelete
                        className="delete-icon"
                        onClick={() => deleteProduct(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ManageProduct;
