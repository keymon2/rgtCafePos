import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Title>테이블 번호</Title>
      <SubTitle>3</SubTitle>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 40px;
`;
const SubTitle = styled.div`
  font-weight: bold;
  font-size: 100px;
`;

export default Home;
