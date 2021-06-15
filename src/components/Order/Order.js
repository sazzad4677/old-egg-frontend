import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { userContext } from "../../App";
import Header from "../Header/Header";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(userContext);
  // const [productPrice] = orders
  useEffect(() => {
    fetch("https://glacial-mesa-63021.herokuapp.com/orders?email=" + loggedIn.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);
  const totalPrice = orders.reduce((total, order) => total + parseInt(order.productPrice), 0)
  return (
    <div>
      <Header></Header>
      <Container
        className="tableContainer"
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <div className="d-flex justify-content-between">
        <h3 className="mt-5">You have {orders.length} Ordered Product</h3>
        <h3 className="mt-5" style={{color: 'red'}}>Total Spent: {totalPrice}</h3>
        </div>
        
        <Table responsive borderless className=" mt-3 table">
          <thead style={{ backgroundColor: "#F5F6FA" }}>
            <tr>
              <th>Serial</th>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{order.orderDate}</td>
                <td>{order.productName}</td>
                <td>${order.productPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Order;
