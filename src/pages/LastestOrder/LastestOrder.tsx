import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
function getDay(Ymd) {
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const year = Ymd.substring(0, 4);
  const month = Ymd.substring(5, 7);
  const day = Ymd.substring(8, 10);

  let week = new Date(year, month - 1, day, 0, 0, 0, 0);
  return weekName[week.getDay()];
}
interface Data {
  weekName: string;
  ymd: string;
  tableNo: string;
  number: string;
  name: string;
}
type Res = {
  data: [
    {
      date_time: string;
      dong: string;
      ho: string;

      order_id: string;

      orderer_nam: string;

      product_name: string;

      robot_status: string;

      seq: string;

      table_no: string;
    }
  ];
};

const LastestOrder = () => {
  const [data, setData] = useState<Data>();
  const PROXY =
    window.location.hostname === "localhost"
      ? ""
      : "http://211.214.213.65:9002";
  const URL = `${PROXY}/codingTest/getLast.php`;
  const getLast = async () => {
    const res: Res = await axios.get(URL);
    console.log(res);
    const weekName = getDay(res.data[0].date_time.substring(0, 10));
    console.log(res.data[0].date_time.substring(0, 10));
    setData({
      weekName: weekName,
      ymd: res.data[0].date_time.substring(0, 10),
      tableNo: res.data[0].table_no,
      number: res.data[0].order_id,
      name: res.data[0].orderer_nam,
    });
  };
  useEffect(() => {
    getLast();
  }, []);

  return (
    <Container>
      {data && (
        <Box>
          <First>
            <FirstTitle>RGT 테스트 매장</FirstTitle>
            <FirstSubTitle>테스트</FirstSubTitle>
          </First>
          <Second>
            <SecondItem>
              <SecondItemTitle>주문일</SecondItemTitle>
              <SecondItemSub>{`${data.ymd}(${data.weekName})`}</SecondItemSub>
            </SecondItem>
            <SecondItem>
              <SecondItemTitle>주문자</SecondItemTitle>
              <SecondItemSub>{!data.name ? "홍길동" : data.name}</SecondItemSub>
            </SecondItem>
            <SecondItem>
              <SecondItemTitle>테이블번호</SecondItemTitle>
              <SecondItemSub>{data.tableNo}</SecondItemSub>
            </SecondItem>
            <SecondItem>
              <SecondItemTitle>주문번호</SecondItemTitle>
              <SecondItemSub>{data.number}</SecondItemSub>
            </SecondItem>
          </Second>
          <Third></Third>
        </Box>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Box = styled.div`
  width: 320px;
  height: 480px;
  display: flex;
  flex-direction: column;
`;
const First = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;
const FirstTitle = styled.div`
  font-size: 25px;
`;
const FirstSubTitle = styled.div`
  font-size: 33px;
`;
const Second = styled.div`
  flex: 2;
  border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const SecondItem = styled.div`
  flex: 1;
  border: 1px solid black;
  width: 280px;
  display: flex;
  align-items: center;
`;
const SecondItemTitle = styled.div`
  flex: 1;
  font-size: 20px;
`;
const SecondItemSub = styled.div`
  flex: 1;

  font-weight: bold;
  font-size: 18px;
`;
const Third = styled.div`
  flex: 1;
  border: 1px solid black;
`;

export default LastestOrder;
