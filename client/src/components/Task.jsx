import React from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

const Task = () => {
  return (
    <Container>
      <TaskContainer>
        <span>Lorem ipsum dolor elit. Labore, sed?</span>
        <FaTrash
          style={{
            cursor: "pointer",
            color: "red",
            size: "20px",
          }}
        />
      </TaskContainer>
      <Deadline>Deadline :</Deadline>
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
  width: inherit;
  border: 3px solid black;
  margin: 15px;
  font-size: 20px;
  letter-spacing: 1.2px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  transition: all 500ms ease-in-out;
  background-color: white;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
    border: none;
  }
`;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const Deadline = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
`;

export default Task;
