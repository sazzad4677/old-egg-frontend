import React, { useEffect, useState } from "react";
import { Button, Card, CardDeck, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import laptop from "../../images/Laptop.jpg";
import "./Products.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://glacial-mesa-63021.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {products.length === 0 ? (
        <div className="circle">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <Col className="mb-3">
              <Card className="h-100 mt-3">
                <Card.Img src={product.productImage} alt="Card image cap" />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>{product.brandName}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <h3>${product.productPrice}</h3>
                  <Link to={`/product/${product._id}`}>
                    <Button>Add to cart</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
