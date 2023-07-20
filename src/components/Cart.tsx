import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { selectMenu } from "../pages/OrderMenu/OrderMeunu";
import axios from "axios";
interface Props {
  orderItems: selectMenu[];
  setSeletedMenu: React.Dispatch<React.SetStateAction<selectMenu[]>>;
}
function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
}

const Cart = (props: Props): JSX.Element => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let sum = 0;
    props.orderItems.map((item) => {
      sum += item.price * item.howMany;
    });
    setTotalPrice(sum);
  }, [props.orderItems]);
  const cancleHandler = (index: number) => {
    props.orderItems.splice(index, 1);
    props.setSeletedMenu([...props.orderItems]);
  };
  const increaseHowMany = (index: number) => {
    props.orderItems[index].howMany++;
    props.setSeletedMenu([...props.orderItems]);
  };
  const dencreaseHpwMany = (index: number) => {
    props.orderItems[index].howMany--;
    if (props.orderItems[index].howMany <= 0) {
      props.orderItems.splice(index, 1);
      props.setSeletedMenu([...props.orderItems]);
    } else {
      props.setSeletedMenu([...props.orderItems]);
    }
  };
  const orderHandler = async () => {
    const timeStamp = Date.now();
    const date = new Date(timeStamp);
    const ymdHis = dateFormat(date);
    const ymd = ymdHis.substring(0, 10);
    const his = ymdHis.substring(11, 20);
    // console.log(ymdHis);
    // console.log(ymd);
    // console.log(his);

    const res = await Promise.all(
      props.orderItems.map((item, index) => {
        const data = {
          order_id: "1234",
          product_name: item.name,
          options: "",
          table_no: 3,
          quantity: item.howMany,
          order_date: ymd,
          order_time: his,
          date_time: ymdHis,
        };
        console.log(data);
        const PROXY =
          window.location.hostname === "localhost"
            ? ""
            : "http://211.214.213.65:9002";
        const URL = `${PROXY}/codingTest/post.php`;
        return axios.post(URL, data, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        });
      })
    );
    console.log(res);
    const ress = res.map((data, index) => {
      const secondPre = data.data.indexOf("<pre/>");
      console.log(data.data.slice(secondPre + 6, data.data.length));
      return data.data.slice(secondPre + 6, data.data.length);
    });
    alert(`${ress[0]} ${ress.length}개 수신 완료`);
  };
  return (
    <Container>
      <OrderListContainer>
        <OrderList>
          {props.orderItems.map((item, index) => (
            <OrderItem key={index * 17}>
              <OrderItemImage src={item.url} />
              <OrderItemTitle>{item.name}</OrderItemTitle>
              <OrderItemTitle>{item.price}</OrderItemTitle>
              <div>
                <OrderItemHowManyButton onClick={() => dencreaseHpwMany(index)}>
                  {" "}
                  -{" "}
                </OrderItemHowManyButton>

                <OrderItemTitle>{item.howMany}</OrderItemTitle>
                <OrderItemHowManyButton onClick={() => increaseHowMany(index)}>
                  {" "}
                  +{" "}
                </OrderItemHowManyButton>
              </div>
              <OrderItemCancled onClick={() => cancleHandler(index)}>
                주문 취소
              </OrderItemCancled>
            </OrderItem>
          ))}
        </OrderList>
      </OrderListContainer>
      <BillBox>
        <BillTotal>
          <Total>total</Total> <Price>{totalPrice}</Price>
        </BillTotal>
        <OrderButton onClick={() => orderHandler()}>주문 하기</OrderButton>
      </BillBox>
    </Container>
  );
};
const Container = styled.div`
  width: 400px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`;
const BillBox = styled.div`
  margin-top: auto;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BillTotal = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Total = styled.div``;
const Price = styled.div``;
const OrderButton = styled.button`
  margin-bottom: 20px;
  text-align: center;
  width: 80%;
  border-radius: 10px;
  border: 0.6px solid black;
`;
const OrderListContainer = styled.div`
  flex: 1;
  justify-content: space-evenly;
  padding-bottom: 0px;
  overflow: hidden;
`;
const OrderList = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
const OrderItem = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 80%;
  height: 250px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
`;
const OrderItemImage = styled.img`
  width: 100%;
  height: 120px;
`;
const OrderItemTitle = styled.span`
  margin: 5px;
`;

const OrderItemHowManyButton = styled.button`
  border-radius: 30px;
`;
const OrderItemCancled = styled.button`
  margin-top: auto;
`;
export default Cart;
