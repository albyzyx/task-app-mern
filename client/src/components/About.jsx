import React from "react";
import styled from "styled-components";
import aboutBackground from "./images/about.svg";
// import notesImg from "./images/notes.svg";

const About = () => {
  return (
    <Container>
      <span>ABOUT US</span>
      <UpperLine></UpperLine>
    </Container>
  );
};

const Container = styled.div`
  background-color: mintcream;

  /* background: url(${aboutBackground});
  background-repeat: no-repeat;
  background-size: cover; */

  span {
    height: calc(100vh - 100px);
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 42px;
  }
`;

const UpperLine = styled.div`
  height: 30px;
  width: 100%;
  background: black;
`;

export default About;
