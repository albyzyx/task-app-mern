import React from "react";
import styled from "styled-components";
import aboutBackground from "./images/about.svg";
import { FaGithub, FaReact } from "react-icons/fa";
import { DiNodejs } from 'react-icons/di';

const About = () => {
  return (
    <Container>
      <span>ABOUT US</span>
      <GithubIcon>
        <a href="https://github.com/albyzyx/task-app-mern"><FaGithub
          style={{
            cursor: "pointer",
            color: "black",
            fontSize: "100px",
          }} />
        </a>
        <span>
          Click Here
        </span>
      </GithubIcon>
      <DiNodejs
        style={{
          cursor: "pointer",
          color: "green",
          fontSize: "200px",
        }} />
      <FaReact
        style={{
          cursor: "pointer",
          color: "green",
          fontSize: "200px",
        }} />
    </Container>
  );
};

const Container = styled.div`
height: calc(100vh - 100px);
  background-color: mintcream;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* background: url(${aboutBackground});
  background-repeat: no-repeat;
  background-size: cover; */

  span {
    font-size: 42px;
  }
`;

const GithubIcon = styled.div`
padding: 5px;
display: flex;
align-items: center;
justify-content: center;
span{
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
`

export default About;
