import React from "react";
import HomeScreen from "./Screen/HomeScreen";
import styled from "styled-components";
import SideBar from "./Desktop/SideBar/SideBar";
import MainBuilt from "./Desktop/MainComp/MainBuilt";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainBuiltDetail from "./Desktop/MainComp/MainBuiltDetail";
import { CreatedProjects } from "./Desktop/Register/CreatedProjects";
import PrivateRoute from "./Desktop/Register/PrivateRoute";
import { Register } from "./Desktop/Register/Register";

const App = () => {
  return (
    <Router>
      <Container>
        <Wrapper>
          <Left>
            <SideBar />
          </Left>
          <Switch>
            <Right>
              <Route exact path="/" component={MainBuilt} />
              <Route exact path="/project/:id" component={MainBuiltDetail} />
              <Route exact path="/created" component={CreatedProjects} />
              <Route exact path="/register" component={Register} />
            </Right>
          </Switch>
        </Wrapper>
      </Container>
    </Router>
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
  flex: 1;
  /* background-color: green; */
  /* height: 50vh; */
  display: flex;

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
