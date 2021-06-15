import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Header from "../Header/Header";
import "./Checkout.css";

const Checkout = () => {
  const { id } = useParams();
  const [loggedIn, setLoggedIn] = useContext(userContext);
  const [carts, setCart] = useState([]);
  const { productName, productPrice } = carts;
  const { name, email } = loggedIn;
  const userInfo = { name, email };
  const newCart = { productName, productPrice };

  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  const orderDate = year + "-" + month + "-" + date;


  useEffect(() => {
    fetch("https://glacial-mesa-63021.herokuapp.com/product/" + id)
      .then((res) => res.json())
      .then((data) => setCart(data[0]));
  }, [id]);

  const handleCheckOut = () => {
    const newOrder = { ...userInfo, ...newCart, orderDate };
    fetch("https://glacial-mesa-63021.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <Header></Header>
      <Container
        className="tableContainer "
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <h3 className="mt-5">Checkout</h3>
        <div>
          <Table responsive className=" mt-3 table">
            <thead style={{ backgroundColor: "#F5F6FA" }}>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{productName}</td>
                <td>1</td>
                <td>{productPrice}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <Link to="/order">
            {" "}
            <Button onClick={handleCheckOut}> Checkout </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
