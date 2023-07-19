import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  price: number;
  url: string;
  clickHandler: () => void;
}
const MenuSelectBox = (props: Props) => {
  return (
    <Container>
      <Image src={props.url} />
      <div>{props.name}</div>
      <div>{props.price}</div>
      <Button onClick={() => props.clickHandler()}> 담기 </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px;
  width: 200px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
  background-color: white;
`;
const Image = styled.img`
  height: 220px;
`;
const Button = styled.button`
  width: 80%;
  height: 30px;
  margin-top: auto;
  margin-bottom: 10px;
`;

export default MenuSelectBox;
