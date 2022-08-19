import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/components/Home";
import AddUser from "../components/components/AddUser";

const RouteLinks = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adduser/:userId" element={<AddUser />} />
    </Routes>
  );
};

export default RouteLinks;