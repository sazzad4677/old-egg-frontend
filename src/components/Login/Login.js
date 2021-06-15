import React, { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import { userContext } from "../../App";
import { firebaseConfig } from "../FirebaseConfig/FirebaseConfig.config";

// handel error with firebase initialization conflict
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(userContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //Choose which component will appear when a new user logs in.
  const [newUser, setNewUser] = useState(false);

  //handel login form
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });


  //Sign in with google account
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = true;
        createdUser.name = result.user.displayName;
        createdUser.email = result.user.email;
        setUser(createdUser);
        setLoggedIn(createdUser);
        storeAuth();
        history.replace(from);
      })
      .catch((error) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = false;
        createdUser.error = error.message;
        setUser(createdUser);
        setLoggedIn(createdUser);
      });
  };

  const storeAuth = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }
  return (
    <div>
      {/* Navigation Bar */}
      <Header user={user}></Header>
      {/* Login or Create account form */}
      <Container>
          <div className="col-md-12 text-center">
            {/* button for Google Login */}
            <button onClick={googleSignIn} className=" mb-3 btn btn-primary ">
              Continue With Gmail
            </button>
          </div>
      </Container>
    </div>
  );
};

export default Login;