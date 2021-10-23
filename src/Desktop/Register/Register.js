import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import firebase from "firebase";
// import LinearProgress from "@mui/material/LinearProgress";
// import CircularProgress from "@mui/material/CircularProgress";
// CircularProgress
import avatarProfile from "./avatar.png";
import { useHistory } from "react-router-dom";
import { app } from "./../../base";

export const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(avatarProfile);
  const [toggle, setToggle] = useState(true);
  const [chn, setChn] = useState(false);

  const [percent, setPercent] = useState(0.0000001);

  const onChn = () => {
    setChn(!chn);
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const savePix = URL.createObjectURL(file);
    setImage(savePix);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("avatar/" + file.name).put(file);

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
          setAvatar(URL);
          console.log(URL);
        });
      }
    );
  };

  const signUpUser = async () => {
    try {
      const authUser = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (authUser) {
        await app
          .firestore()
          .collection("dataBaseUsers")
          .doc(authUser.user.uid)
          .set({
            email,
            password,
            name,
            avatar,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: authUser.user.uid,
          });
      }
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const signInUser = async () => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const signInUserWithGoogle = async () => {
    try {
      const userProvider = new firebase.auth.GoogleAuthProvider();
      const authUser = await app.auth().signInWithPopup(userProvider);
      // console.log(authUser);

      if (authUser) {
        await app
          .firestore()
          .collection("dataBaseUsers")
          .doc(authUser.user.uid)
          .set({
            email: authUser.user.email,
            name: authUser.user.displayName,
            avatar: authUser.user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: authUser.user.uid,
          });
      }
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      {chn ? (
        <Wrapper>
          <Title>
            Already have an account yet,{" "}
            <span onClick={onChn}>Click here to Sign-In</span>
          </Title>
          <Card>
            <Holder>
              {" "}
              <Image src={image} />
              <ImageHolder>
                {percent > 0.0000001 && percent <= 99 ? (
                  <ImageHolder>
                    {/* <LinearProgress
                      // color="secondary"
                      variant="determinate"
                      value={percent}
                    /> */}
                  </ImageHolder>
                ) : null}
              </ImageHolder>
              <ImageLable htmlFor="pix">Upload your Image </ImageLable>
              <ImageInput type="file" id="pix" onChange={uploadImage} />
            </Holder>

            <Label>Name</Label>
            <MainInput
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label>Email</Label>
            <MainInput
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Label>Password</Label>
            {toggle ? (
              <PassHold>
                <MainInputPass
                  placeholder="Enter your Password"
                  value={password}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MdVisibility
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "gray",
                    fontSize: "20px",
                  }}
                  onClick={onToggle}
                />
              </PassHold>
            ) : (
              <PassHold>
                <MainInputPass
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MdVisibilityOff
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "20px",
                  }}
                  onClick={onToggle}
                />
              </PassHold>
            )}

            <Button bg="#09386d" onClick={signUpUser}>
              Register
            </Button>

            <Line />

            <Button bg1="red" onClick={signInUserWithGoogle}>
              <FcGoogle />
              <span>Register with Google</span>
            </Button>
          </Card>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>
            Don't have an account,{" "}
            <span onClick={onChn}>Click here to Create one</span>
          </Title>
          <Card>
            <Label>Email</Label>
            <MainInput
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Label>Password</Label>
            {toggle ? (
              <PassHold>
                <MainInputPass
                  placeholder="Enter your Password"
                  value={password}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MdVisibility
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "gray",
                    fontSize: "20px",
                  }}
                  onClick={onToggle}
                />
              </PassHold>
            ) : (
              <PassHold>
                <MainInputPass
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MdVisibilityOff
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "20px",
                  }}
                  onClick={onToggle}
                />
              </PassHold>
            )}
            {error ? (
              <ErrorDiv>Your Email or Password, doesn't match </ErrorDiv>
            ) : null}
            <Button bg="#09386d" onClick={signInUser}>
              Sign In
            </Button>

            <Line />

            <Button bg1="red" onClick={signInUserWithGoogle}>
              <FcGoogle />
              <span>Sign in with Google</span>
            </Button>
          </Card>
        </Wrapper>
      )}
    </Container>
  );
};

// const Button = styled.div``

const ErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const ImageHolder = styled.div`
  width: 150px;
  height: 5px;
  /* display: flex; */
  /* background-color: coral; */
`;

const Line = styled.div`
  border-top: 1px solid lightgray;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
`;

const Button = styled.div`
  margin: 20px auto;
  margin-top: 40px;
  background-color: ${({ bg }) => bg};
  border: 2px solid;
  border-color: ${({ bg1 }) => bg1};
  width: 80%;
  height: 60px;
  padding: 20px 0;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
  padding-right: 10px;
  transition: all 350ms;
  transform: scale(1);
  border-radius: 5px;
  font-weight: bold;

  span {
    color: ${({ bg1 }) => bg1};
  }

  :hover {
    transform: scale(0.99);
    cursor: pointer;
  }

  span {
    margin-left: 10px;
  }
`;

const PassHold = styled.div`
  display: flex;
  border: 2px solid lightgray;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  padding-right: 10px;
  border-radius: 3px;
  height: 45px;

  :hover {
    border: 2px solid #14297c;
  }
`;

const MainInputPass = styled.input`
  /* width: 80%; */
  height: 100%;
  margin: 0 auto;
  padding: 10px 0;
  border: 0;
  outline: none;
  border-radius: 3px;
  font-size: 18px;
  padding-left: 10px;
  flex: 1;
  ::placeholder {
    font-family: Raleway;
    color: lightgray;
  }
`;

const Holder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #09386d;
  object-fit: cover;
  margin-bottom: 10px;
`;
const ImageInput = styled.input`
  display: none;
`;
const ImageLable = styled.label`
  background-color: #09386d;
  padding: 10px 15px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  transform: scale(1);
  transition: all 350ms;
  margin-top: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Label = styled.label`
  margin: 10px auto;
  width: 80%;
  margin-top: 30px;
`;

const MainInput = styled.input`
  width: 80%;
  height: 50px;
  padding: 10px 0;
  margin: 0 auto;
  border: 2px solid lightgray;
  outline: none;
  border-radius: 3px;
  font-size: 18px;
  padding-left: 10px;

  ::placeholder {
    font-family: Raleway;
    color: lightgray;
  }

  :hover {
    border: 2px solid #14297c;
  }
`;

const Card = styled.div`
  padding-bottom: 20px;
  width: 600px;
  background-color: white;
  height: 700px;
  border-radius: 5px;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  @media screen and (max-width: 600px) {
    width: 300px;
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.div`
  /* font-weight: bold; */
  margin: 20px;
  font-size: 20px;

  span {
    cursor: pointer;
    color: #09386d;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  /* margin-top: 100px; */
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 70vh;
  padding-top: 120px;
  /* background-color: #f8f9fc; */
`;
