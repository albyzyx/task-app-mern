import React from "react";
import styled from "styled-components";
import aboutBackground from "./images/about.svg";
import { FaGithub, FaReact } from "react-icons/fa";
import { DiNodejs, DiMongodb } from 'react-icons/di';

const About = () => {
  return (
    <Container>
      <AboutContainer>
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
      </AboutContainer>
      <Footer>
        <DiMongodb
          style={{
            cursor: "pointer",
            fontSize: "150px",
          }} />
        <span
          style={{
            cursor: "pointer",
            fontSize: "45px",
          }} >
          express.js</span>
        <FaReact
          style={{
            cursor: "pointer",
            fontSize: "150px",
          }} />
        <DiNodejs
          style={{
            cursor: "pointer",
            fontSize: "150px",
          }} />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
/* height: calc(100vh - 100px); */
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const AboutContainer = styled.div`
margin-top: 200px;
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
const Footer = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
width: 100vw;
margin-left: -5px;
margin-top: 150px;
`

export default About;
