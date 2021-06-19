import React from "react";
import styled from "styled-components";
import Header from "./Header";

const About = () => {
  return (
    <Container>
      {/* <Header /> */}
      <span>ABOUT US</span>
    </Container>
  );
};

const Container = styled.div`
  background-color: mintcream;

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

export default About;
