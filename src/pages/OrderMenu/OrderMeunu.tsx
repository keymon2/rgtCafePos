import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuItem, TagItem, menuData, tagData } from "./menuConfig";
import MenuSelectBox from "./MenuSelectBox";
import Cart from "../../components/Cart";
export interface selectMenu extends MenuItem {
  howMany: number;
}
const OrderMeunu = () => {
  const [tagList, setTagList] = useState<TagItem[]>(tagData);
  const [menuList, setMenuList] = useState<MenuItem[][]>(menuData);
  const [whatTag, setWhatTag] = useState<number>(0);
  const [selectedMenu, setSelectedMenu] = useState<selectMenu[]>([]);
  useEffect(() => {
    tagData.map((data, index) => {
      if (data.isActive) {
        setWhatTag(index);
      }
    });
  }, []);
  const tagClickHandler = (index: number) => {
    setTagList([
      ...tagList.map((tag, i) => {
        if (i === index) tag.isActive = true;
        else tag.isActive = false;
        return tag;
      }),
    ]);
    setWhatTag(index);
  };
  const selectMenuHandler = (index: number) => {
    const a = selectedMenu.find(
      (menu) => menu.name === menuList[whatTag][index].name
    );
    if (a) {
      const list = selectedMenu.map((item) => {
        if (item.name === menuList[whatTag][index].name) {
          item.howMany++;
        }
        return item;
      });
      setSelectedMenu([...list]);
    } else {
      selectedMenu.push({ ...menuList[whatTag][index], howMany: 1 });
      setSelectedMenu([...selectedMenu]);
    }
  };
  return (
    <>
      <Container>
        <SearchBox>
          <SearchBar />
        </SearchBox>
        <TagBox>
          {tagList.map((tag, index) => {
            return (
              <Tag
                active={tag.isActive}
                key={index * 2}
                onClick={() => tagClickHandler(index)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </TagBox>
        <MenuBox>
          {menuList[whatTag].map((menu, index) => (
            <MenuSelectBox
              key={index * 3}
              name={menu.name}
              url={menu.url}
              price={menu.price}
              clickHandler={() => {
                selectMenuHandler(index);
              }}
            />
          ))}
        </MenuBox>
      </Container>
      <Cart orderItems={selectedMenu} setSeletedMenu={setSelectedMenu} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ebebeb;
`;
const SearchBox = styled.div`
  margin-top: 40px;
  flex: 3;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const SearchBar = styled.input`
  width: 88%;
  height: 20px;
`;
const TagBox = styled.div`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const MenuBox = styled.div`
  flex: 30;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Tag = styled.div<{ active: boolean }>`
  border-radius: 10px;
  margin: 10px;
  width: 80px;
  height: 30px;
  background-color: ${({ active }) => (active ? "orange" : "white")};
  justify-content: center;
  align-items: center;
  display: flex;
`;
export default OrderMeunu;
