import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { app } from "./../../base";
import { ProjectTeamMember } from "./ProjectTeam";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineUserRemove } from "react-icons/hi";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { addScheduledTask } from "../State/GlobalState";

const MainBuiltDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.myReducer.taskState);

  console.log("This is the state data: ", stateData);
  const [newState, setNewState] = useState([]);

  const onTaskData = async () => {
    await app
      .firestore()
      .collection("project")
      .doc(id)
      .collection("task")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        console.log("gettign Data: ", r);
        dispatch(addScheduledTask(r));
      });
  };

  const [project, setProject] = useState({});
  const [myButton, setMyButton] = useState(true);
  const [projectTask, setProjectTask] = React.useState([
    { task: "", team: "" },
  ]);

  const addTask = (i, e) => {
    const values = [...projectTask];
    values[i][e.target.name] = e.target.value;
    setProjectTask(values);
  };

  const onSubmit = (e) => {
    console.log(projectTask);
  };

  const addMore = () => {
    setProjectTask([...projectTask, { task: "", team: "" }]);
  };
  const removeMore = (i) => {
    const values = [...projectTask];
    values.splice(i, 1);
    setProjectTask(values);
  };

  const onGetData = async (id) => {
    await app
      .firestore()
      .collection("project")
      .doc(id)
      .get()
      .then((myData) => setProject(myData.data()));
  };

  const onChangeButtonData = async () => {
    await app.firestore().collection("project").doc(id).update({
      buttonState: myButton,
    });
  };

  const taskedPosted = async () => {
    // const saveUser = await app.auth().currentUser;

    // if (saveUser) {
    //   await app
    //     .firestore()
    //     .collection("project")
    //     .doc(id)
    //     .collection("task")
    //     .doc()
    //     .set({
    //       button: buttonState,
    //       projectTask,
    //       createdBy: saveUser.uid,
    //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     });
    // }

    await app
      .firestore()
      .collection("project")
      .doc(id)
      .collection("task")
      .doc()
      .set({
        projectTask,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  useEffect(() => {
    onGetData(id);
    console.log(project, id);
    onChangeButtonData();
    onTaskData();
  }, [id, project]);

  useEffect(() => {
    const saveState = JSON.parse(localStorage.getItem("state"));
    setMyButton(saveState);
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(myButton));
  }, [myButton]);

  return (
    <Container>
      <Wrapper>
        <Project>
          <Card>
            <Title>Team members for this Project</Title>

            <Team>
              {project.team?.map(({ teamMember }) => (
                <ProjectTeamMember teamMember={teamMember} />
              ))}
            </Team>
            <Title>Enter Task needed for this Project </Title>
            <MyTasked>
              <InputHolder>
                <MainLabel>Project Team Members</MainLabel>
                {projectTask?.map((props, i) => (
                  <MapMember key={i}>
                    <MainInput
                      placeholder={`Task ${i + 1}`}
                      name="task"
                      value={props.task}
                      onChange={(e) => {
                        addTask(i, e);
                      }}
                    />
                    <MainInput
                      placeholder={`Team UID ${i + 1}`}
                      name="team"
                      value={props.team}
                      onChange={(e) => {
                        addTask(i, e);
                      }}
                    />
                    {project.buttonState ? (
                      <MyTasked>
                        {projectTask.length > 8 ? null : (
                          <Icons onClick={addMore} cl="green">
                            <AiOutlineUsergroupAdd />
                          </Icons>
                        )}
                        {projectTask.length > 1 ? (
                          <Icons onClick={removeMore} cl="red">
                            <HiOutlineUserRemove />
                          </Icons>
                        ) : null}
                      </MyTasked>
                    ) : null}
                  </MapMember>
                ))}
                <Div>
                  {project.buttonState}

                  {project?.buttonState ? (
                    <Button
                      onClick={() => {
                        setMyButton(false);
                        onChangeButtonData();
                        taskedPosted();
                      }}
                    >
                      Done Listing
                    </Button>
                  ) : null}
                </Div>
              </InputHolder>
            </MyTasked>
          </Card>
          <Card>
            <Title>Veiw Task all task </Title>
            <MainLabel>Tasked</MainLabel>
            <Placed>
              {stateData?.projectTask?.map((props) => (
                <div>
                  <div>{props.team} </div>
                  <div></div>
                </div>
              ))}
              {stateData.test}
              {stateData.length}
            </Placed>{" "}
            hello
          </Card>
          <Card>
            <Title>Enter Task fro this Project </Title>
          </Card>
        </Project>
      </Wrapper>
    </Container>
  );
};

export default MainBuiltDetail;

const Placed = styled.div``;
const Button = styled.button`
  outline: none;
  border: 0;
  width: 400px;
  height: 60px;
  background-color: #004080;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 350ms;
  transform: scale(1);
  border-radius: 3px;
  color: white;
  font-weight: bold;

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const MyTasked = styled.div``;

const Icons = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 0px;
  margin-left: 15px;
  color: ${({ cl }) => cl};

  :hover {
    cursor: pointer;
  }
`;

const MapMember = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
`;
const MainInput = styled.input`
  margin: 0 5px;
  width: 92%;
  height: 40px;
  padding-left: 10px;
  margin-top: 10px;
  outline: none;
  border: 2px solid #004080;
  border-radius: 5px;

  ::placeholder {
    font-family: Raleway;
  }
`;

const MainLabel = styled.label`
  color: #004080;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1.2px;
`;

const InputHolder = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 20px;
  width: 500px;
  margin-left: 10px;

  @media screen and (max-width: 800px) {
    width: 280px;
  }
`;

const Team = styled.div`
  display: flex;
  margin: 10px;
`;

const Title = styled.div`
  text-align: center;
  padding-top: 20px;
  font-weight: bold;
`;

const Card = styled.div`
  margin: 10px;
  width: 500px;
  min-height: 600px;
  height: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: all 350ms;
  padding-bottom: 50px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }
`;

const Project = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 40px;
`;

const Wrapper = styled.div`
  width: 95%;
  height: 100%;
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
