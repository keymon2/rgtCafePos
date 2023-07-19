import React from "react";
import { Routes, Route } from "react-router";
import styled from "styled-components";
import Home from "../pages/Home/Home";
import LastestOrder from "../pages/LastestOrder/LastestOrder";
import OrderMeunu from "../pages/OrderMenu/OrderMeunu";
import Cart from "./Cart";

const Menu = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="orderMenu" element={<OrderMeunu />} />
        <Route path="lastesOrder" element={<LastestOrder />} />
      </Routes>
    </>
  );
};

const Container = styled.div`
  border: 1px solid black;
  flex: 1;
`;
export default Menu;
