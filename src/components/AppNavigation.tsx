import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
type navItem = {
  name: string;
  route: string;
  isClick: boolean;
};

const AppNavigation = (): JSX.Element => {
  const [navItemList, setNavItemList] = useState<navItem[]>([
    {
      name: "Home",
      route: "/",
      isClick: true,
    },
    {
      name: "Order",
      route: "/orderMenu",
      isClick: false,
    },
    {
      name: "History",
      route: "/lastesOrder",
      isClick: false,
    },
  ]);
  const navigation = useNavigate();

  const navItemClickHandler = (index: number) => {
    navigation(navItemList[index].route);
    setNavItemList([
      ...navItemList.map((item, i) => {
        if (i === index) item.isClick = true;
        else item.isClick = false;
        return item;
      }),
    ]);
  };

  return (
    <Container>
      <Logo>테이블 3</Logo>
      {navItemList.map((item, index) => {
        return (
          <NavItem
            key={index * 17}
            onClick={() => navItemClickHandler(index)}
            active={item.isClick}
          >
            {item.name}
          </NavItem>
        );
      })}
    </Container>
  );
};
export default AppNavigation;
const Container = styled.div`
  width: 180px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.div`
  height: 50px;
  margin-bottom: 100px;
  padding-top: 20px;
  text-align: center;
`;
const NavItem = styled.div<{ active: boolean }>`
  margin: 20px auto;
  width: 150px;
  height: 40px;
  border-radius: 10px;
  border: 0.6px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? "orange" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
`;
