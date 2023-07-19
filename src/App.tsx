import React from "react";
import AppNavigation from "./components/AppNavigation";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import { styled } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
function App() {
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <Container>
        <AppNavigation />
        <Menu />
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;
export default App;
