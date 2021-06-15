import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { userContext } from "../../App";
import Header from "../Header/Header";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(userContext);
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

  return (
    <div>
      <Header></Header>
      <Container
        className="tableContainer"
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <h3 className="mt-5">You have {orders.length} Ordered Product</h3>
        <Table responsive borderless className=" mt-3 table">
          <thead style={{ backgroundColor: "#F5F6FA" }}>
            <tr>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
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
