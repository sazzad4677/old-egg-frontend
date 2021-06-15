import React from "react";
import { BsCloudUpload } from "react-icons/bs";
import axios from "axios";
import { useState, useForm } from "react";
import { Button, Form, Navbar, Row } from "react-bootstrap";

const AddProductForm = () => {
  // get data from user
  const [inputData, setInputData] = useState({
    productName: "",
    brandName: "",
    productPrice: "",
    productImage: "",
  });
  // product added success message
  const [success, setSuccess] = useState({
    status:null, 
    message: ""
  });
  //image upload status
  const [imageSuccess, setImageSuccess] = useState({
    status: null,
    message:""
  });

  //get input data
  const getData = (e) => {
    const data = { ...inputData };
    data[e.target.name] = e.target.value;
    setInputData(data);
  };

  //form submit send data to server
  const handelSubmit = (e) => {
    const product = inputData;
    fetch("https://glacial-mesa-63021.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((response) => {
      if (response.status === 200) {
        setSuccess({ status: true, message: "Product Added Successfully"})
        setTimeout(() =>{setSuccess({ status:null, message: ""})},5000);
      }
      else{
        setSuccess({ status: false, message: "Sorry Something Went Wrong,Please try again"});
        setTimeout(() =>{setSuccess({ status:null, message: ""})},5000);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    e.preventDefault();
  };

  //handel image upload
  const handelImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "4c5b39315115b5add699e93840f098d7");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        if (response.status === 200) {
          inputData.productImage = response.data.data.display_url;
          setImageSuccess({ status: true, message: "Image Upload Success"});
          setTimeout(() =>{setImageSuccess({ status:null, message: ""})},5000)
        } else {
          setImageSuccess({ status: false, message: "Image Upload Failed" });
          setTimeout(() =>{setImageSuccess({ status:null, message: ""})},5000)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handelSubmit}>
        <div className="mt-2 row">
          <Form.Group className="mb-3 col-md-5">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="productName"
              type="text"
              placeholder="Enter Name"
              onChange={getData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-5">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              name="brandName"
              type="text"
              placeholder="Enter brand Name"
              onChange={getData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-5">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              name="productPrice"
              type="text"
              placeholder="Enter Price"
              pattern="^[0-9]*$"
              title="Price must be a number"
              onChange={getData}
              required
            />
          </Form.Group>
          <div className="upload-btn-wrapper ml-3 mt-2">
            <h6 className="upload-label">Add Product Image</h6>
            {/* <Button className="upload-btn" onChange={handelImageUpload}>
                    {" "}
                    <BsCloudUpload /> Upload a file
                  </Button> */}
            <input type="file" name="file" onChange={handelImageUpload} pattern="([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)" title="Upload a valid image file" required/>
            {imageSuccess.status ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                {imageSuccess.message}
              </p>
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {imageSuccess.message}
              </p>
            )}
          </div>
        </div>
         <Button type="submit" className=" submitBtn"> Submit </Button>
        {success.status? <p style={{color: 'green'}}>{success.message}</p> : <p style={{color: 'red'}}>{success.message}</p>}
      </Form>
    </div>
  );
};

export default AddProductForm;
