import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ManageProduct from "./components/ManageProduct/ManageProduct";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Sidebar from "./components/Sidebar/Sidebar";
import Order from "./components/Order/Order";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NoMatch from "./components/NoMatch/NoMatch";
export const userContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState({});
  return (
    <div className="App">
      <userContext.Provider value={[loggedIn, setLoggedIn]}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/product/:id">
              <Checkout />
            </Route>
            <PrivateRoute path="/addProduct">
              <AddProduct></AddProduct>
            </PrivateRoute>
            <PrivateRoute path="/manageProduct">
              <ManageProduct />
            </PrivateRoute>
            <PrivateRoute path="/order">
              <Order />
            </PrivateRoute>
            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
