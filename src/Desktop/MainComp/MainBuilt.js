import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import moment from "moment";
import { ProjectTeamMember } from "./ProjectTeam";
import { Link } from "react-router-dom";

const MainBuilt = () => {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    await app
      .firestore()
      .collection("project")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setUser(r);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(user);
  }, []);
  return (
    <Container>
      <Wrapper>
        <Project>
          {user?.map(
            ({
              id,
              projectName,
              projectDesc,
              projectDate,
              createdAt,
              projectImage,
              team,
            }) => (
              <Card key={id} to={`/project/${id}`}>
                <Image src={projectImage} />
                <Content>
                  <ProjectName>{projectName}</ProjectName>
                  <ProjectDesc>{projectDesc}</ProjectDesc>
                  {/* <ProjectTime>{createdAt.toDate()}</ProjectTime> */}

                  <ProjectTeam>
                    {team?.map(({ teamMember }) => (
                      <Holder>
                        <ProjectTeamMember teamMember={teamMember} />
                      </Holder>
                    ))}
                  </ProjectTeam>
                </Content>
              </Card>
            )
          )}
        </Project>
      </Wrapper>
    </Container>
  );
};

export default MainBuilt;

const Holder = styled.div``;

const ProjectTeam = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProjectTime = styled.div`
  flex: 1;
`;

const ProjectDesc = styled.div`
  margin-bottom: 5px;
`;

const ProjectName = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Card = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  transition: all 350ms;

  :hover {
    color: black;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

const Project = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 40px;
`;

const Wrapper = styled.div`
  width: 90%;
  min-height: 80%;
  height: 100%;
  margin-top: 100px;
  border-radius: 20px;
  background-color: white;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
