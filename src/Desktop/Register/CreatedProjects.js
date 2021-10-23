import React, { useContext } from "react";
import styled from "styled-components";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineUserRemove } from "react-icons/hi";
import place from "./projects.jpg";
import { AuthContext } from "./../Register/AuthProvider";
import firebase from "firebase";
import { app } from "./../../base";

export const CreatedProjects = () => {
  const { currentUser } = useContext(AuthContext);
  const [team, setTeam] = React.useState([{ teamMember: "" }]);

  const [img, setImg] = React.useState(place);

  const [image, setImage] = React.useState(place);
  const [projectImage, setProjectImage] = React.useState("");
  const [percent, setPercent] = React.useState(0.0001);

  const [projectName, setProjectName] = React.useState("");
  const [projectDesc, setProjectDesc] = React.useState("");
  const [projectDate, setProjectDate] = React.useState("");

  const imgUpload = (e) => {
    const file = e.target.files[0];
    const saveFile = URL.createObjectURL(file);
    setImg(saveFile);
  };

  const addTeamMember = (i, e) => {
    const values = [...team];
    values[i][e.target.name] = e.target.value;
    setTeam(values);
  };

  const onSubmit = (e) => {
    console.log(team);
  };

  const addMore = () => {
    setTeam([...team, { teamMember: "" }]);
  };
  const removeMore = (i) => {
    const values = [...team];
    values.splice(i, 1);
    setTeam(values);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const savePix = URL.createObjectURL(file);
    setImage(savePix);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("projectImage/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

        setPercent(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((URL) => {
          setProjectImage(URL);
          console.log(URL);
        });
      }
    );
  };

  const onPushToFirebase = async () => {
    const saveUser = await app.auth().currentUser;

    if (saveUser) {
      await app.firestore().collection("project").doc().set({
        buttonState: true,
        projectName,
        projectDesc,
        projectDate,
        team,
        projectImage,
        createdBy: saveUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setProjectName("");
      setProjectDate("");
      setProjectDesc("");
    }
  };
  console.log("User: ", currentUser?.uid);

  return (
    <Container>
      <Wrapper>
        <Header>Create a new Project</Header>
        {currentUser?.uid}
        <Card>
          <InputCard>
            <Image src={image} />
            <Label htmlFor="pix">Upload tthe project Image</Label>
            <ImageInput type="file" id="pix" onChange={uploadImage} />
          </InputCard>
          <InputCard>
            <InputHolder>
              <MainLabel>Project Title</MainLabel>
              <MainInput
                placeholder="Project Title"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </InputHolder>
            <InputHolder>
              <MainLabel>Project Description</MainLabel>
              <MainInput
                placeholder="Project Description"
                value={projectDesc}
                onChange={(e) => {
                  setProjectDesc(e.target.value);
                }}
              />
            </InputHolder>
            <InputHolder>
              <MainLabel>Project Deadline</MainLabel>
              <MainInput
                placeholder="Project DeadLine"
                value={projectDate}
                onChange={(e) => {
                  setProjectDate(e.target.value);
                }}
              />
            </InputHolder>
            <InputHolder>
              <MainLabel>Project Team Members</MainLabel>
              {team?.map((props, i) => (
                <MapMember key={i}>
                  <MainInput
                    placeholder={`Team member ${i + 1}`}
                    name="teamMember"
                    value={props.teamMember}
                    onChange={(e) => {
                      addTeamMember(i, e);
                    }}
                  />
                  {team.length > 6 ? null : (
                    <Icons onClick={addMore} cl="green">
                      <AiOutlineUsergroupAdd />
                    </Icons>
                  )}
                  {team.length > 1 ? (
                    <Icons onClick={removeMore} cl="red">
                      <HiOutlineUserRemove />
                    </Icons>
                  ) : null}
                </MapMember>
              ))}
            </InputHolder>
          </InputCard>
        </Card>
        <ButtonHolder onClick={onPushToFirebase}>
          <Add>Add Project</Add>
        </ButtonHolder>
      </Wrapper>
    </Container>
  );
};

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Icons = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 15px;
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

  @media screen and (max-width: 800px) {
    width: 280px;
  }
`;

const InputCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: red;
`;
const ImageInput = styled.input`
  display: none;
`;

const Label = styled.label`
  background-color: #004080;
  padding: 5px 10px;
  border-radius: 20px;
  height: 30px;
  color: white;
  transition: all 350ms;
  transform: scale(1);
  display: flex;
  align-items: center;
  margin-top: 10px;

  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const Add = styled.div`
  color: #004080;
  font-size: 20px;
  font-weight: bold;
  width: 80%;
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
  transition: all 350ms;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  margin-top: 50px;
  border-radius: 5px;

  :hover {
    background-color: #004080;
    color: white;
    cursor: pointer;
  }
`;

const Desc = styled.div`
  margin: 0 10px;
  padding-bottom: 10px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 30px;
  padding-top: 30px;
  margin-bottom: 50px;
`;
const Title = styled.div`
  padding: 20px 30px;
  flex: 1;
`;
const Color = styled.div`
  width: 100%;
  height: 60%;
  background-color: rgba(232, 188, 102, 0.3);
`;
const MinCard = styled.div`
  width: 300px;
  height: 300px;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
  border-radius: 5px;
  transition: all 350ms;
  transform: scale(1);
  overflow: hidden;
  margin: 10px;
  display: flex;
  flex-direction: column;

  :hover {
    cursor: pointer;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;
const Card = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;
const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
