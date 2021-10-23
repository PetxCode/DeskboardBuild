import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "./../../base";

export const ProjectTeamMember = ({ teamMember }) => {
  const [team, setTeam] = useState([]);

  const onGetData = async () => {
    await app
      .firestore()
      .collection("dataBaseUsers")
      .doc(teamMember)
      .get()
      .then((myData) => setTeam(myData.data()));
  };

  useEffect(() => {
    onGetData();
  }, [teamMember]);

  return (
    <Container>
      <Wrapper>
        <Image src={team?.avatar} />
        <Card>{team?.name}</Card>
        <Card1>{team?.createdBy}</Card1>
      </Wrapper>
    </Container>
  );
};

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background-color: red;
  margin: 5px;
`;
const Card1 = styled.div`
  font-size: 10px;
  width: 100px;
  opacity: 0;

  :hover {
    opacity: 1;
  }
`;
const Card = styled.div`
  font-size: 10px;
  font-weight: bold;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  /* width: 100%; */
  flex-direction: row;
`;
