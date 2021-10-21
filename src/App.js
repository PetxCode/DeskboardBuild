import React from "react";
import HomeScreen from "./Screen/HomeScreen";
import styled from "styled-components";
import SideBar from "./Desktop/SideBar/SideBar";

const App = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <SideBar />
        </Left>
        <Right>Right</Right>
      </Wrapper>
    </Container>
  );
};

export default App;

const Left = styled.div`
  /* flex: 0.2; */

  @media screen and (max-width: 923px) {
    display: flex;
    /* flex: 0.1; */
  }
`;
const Right = styled.div`
  flex: 0.8;
  /* background-color: green; */
  /* height: 50vh; */

  @media screen and (max-width: 923px) {
    display: flex;
    /* flex: 0.9; */
  }
`;

const Wrapper = styled.div`
  display: flex;
  /* flex: 1; */
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
