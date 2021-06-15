import React from "react";
import { Col, ListGroup, Nav, Navbar, Row } from "react-bootstrap";
import { GiNestEggs } from "react-icons/gi";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <ListGroup className="sidebarList">
        {SidebarData.map((value, key) => (
          <ListGroup.Item key={key} className="row">
            <span id="icon">{value.icon}</span>
            <span id="title">{value.title}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
    </div>
  );
};

export default Sidebar;
