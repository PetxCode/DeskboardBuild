import React from "react";
import styled from "styled-components";
import { AiFillSetting, AiFillHome, AiFillPieChart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { RiUserSmileFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillPersonLinesFill,
  BsFillCartFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { app } from "./../../base";

const SideBar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const onToggle = () => {
    setToggle(!toggle);
  };
  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <>
      {toggle ? (
        <Container>
          <Wrapper>
            <LogoHolder>
              <Logo />
            </LogoHolder>

            <NavHolder>
              <Navigation>
                <Nav to="/">
                  <Icon>
                    <AiFillHome />
                  </Icon>
                  <span>Home</span>
                </Nav>
                <Nav to="/">
                  <Icon>
                    <BsFillPersonLinesFill />
                  </Icon>
                  <span>Profile</span>
                </Nav>
                {/* <Nav to="/">
                  <Icon>
                    <BsFillCartFill />
                  </Icon>
                  <span>Product</span>
                </Nav> */}
                <Nav to="/">
                  <Icon>
                    <AiFillPieChart />
                  </Icon>
                  <span>Stats</span>
                </Nav>
                <Nav to="/">
                  <Icon>
                    <AiFillSetting />
                  </Icon>
                  <span>Settings</span>
                </Nav>
              </Navigation>
            </NavHolder>

            <Other>
              <Nav1
                onClick={() => {
                  app.auth().signOut();
                }}
              >
                <Icon>
                  <BiLogIn />
                </Icon>
                <span>Log Out</span>
              </Nav1>
              <Icons onClick={onToggle}>
                <Icon>
                  <BsFillArrowLeftCircleFill />
                </Icon>
              </Icons>
            </Other>
          </Wrapper>
        </Container>
      ) : (
        <InnerMenu>
          <Menu onClick={onToggleMenu}>
            <GiHamburgerMenu />
          </Menu>

          {toggleMenu ? (
            <InnerContainer>
              <Wrapper>
                <LogoHolder>
                  <Logo />
                </LogoHolder>

                <NavHolder>
                  <Navigation>
                    <Nav to="/">
                      <InnerIcon>
                        <AiFillHome />
                      </InnerIcon>
                    </Nav>
                    <Nav to="/created">
                      <InnerIcon>
                        <BsFillPersonLinesFill />
                      </InnerIcon>
                    </Nav>
                    {/* <Nav to="/">
                      <InnerIcon>
                        <BsFillCartFill />
                      </InnerIcon>
                    </Nav> */}
                    <Nav to="/">
                      <InnerIcon>
                        <AiFillPieChart />
                      </InnerIcon>
                    </Nav>
                    <Nav to="/">
                      <InnerIcon>
                        <AiFillSetting />
                      </InnerIcon>
                    </Nav>
                  </Navigation>
                </NavHolder>

                <Other>
                  <Nav1>
                    <InnerIcon>
                      <BiLogIn />
                    </InnerIcon>
                  </Nav1>
                  <Icons onClick={onToggle}>
                    <Icon>
                      <BsFillArrowRightCircleFill />
                    </Icon>
                  </Icons>
                </Other>
              </Wrapper>
            </InnerContainer>
          ) : null}
        </InnerMenu>
      )}
    </>
  );
};

export default SideBar;

const InnerMenu = styled.div`
  display: flex;
  @media screen and (max-width: 923px) {
    display: flex;
    width: 100px;
    position: fixed;
  }
`;
const Menu = styled.div`
  display: none;
  @media screen and (max-width: 923px) {
    z-index: 10;
    display: flex;
    width: 100%;
    font-size: 30px;
    justify-content: center;
    position: absolute;
  }
`;

const InnerIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100px;
  height: 100vh;
  background-color: lightgray;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  position: fixed;

  @media screen and (max-width: 923px) {
    display: flex;
    width: 100px;
    height: 100vh;
    background-color: lightgray;
    position: fixed;
  }
`;

const InnerWrapper = styled.div`
  display: none;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  padding-right: 10px;
  font-size: 20px;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 923px) {
    display: none;
    width: 100px;
    justify-content: flex-end;
    span {
      display: none;
    }
  }
`;
const Other = styled.div``;
const Logo = styled.img`
  width: 200px;
  height: 60px;
  background-color: red;
  object-fit: contain;
`;

const LogoHolder = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0;

  @media screen and (max-width: 923px) {
    width: 100px;
  }
`;

const Icon = styled.div`
  display: flex;
  margin-bottom: 2px;
  margin-right: 10px;
  margin-left: 10px;
`;

const Nav = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  height: 50px;
  transition: all 350ms;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;

  span {
    font-size: 15px;
    font-weight: bold;
  }

  :hover {
    cursor: pointer;
    background-color: #002f5e;
    color: white;
  }

  @media screen and (max-width: 923px) {
    display: flex;
    width: 100px;
    justify-content: center;
    span {
      display: none;
    }
  }
`;

const Nav1 = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 30px;
  transition: all 350ms;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;

  span {
    font-size: 15px;
    font-weight: bold;
  }

  :hover {
    cursor: pointer;
    background-color: #002f5e;
    color: white;
  }

  @media screen and (max-width: 923px) {
    display: flex;
    width: 100px;
    justify-content: center;
    span {
      display: none;
    }
  }
`;
const Navigation = styled.div``;
const NavHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 300px;
  height: 100vh;
  background-color: lightgray;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  position: fixed;

  @media screen and (max-width: 923px) {
    display: flex;
    width: 100px;
    height: 100vh;
    background-color: lightgray;
    position: fixed;
  }
`;
