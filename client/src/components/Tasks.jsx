import styled from "styled-components";
import Task from "./Task";
import AddTask from "./AddTask";

const Tasks = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Date>Date</Date>
          <AddButton>Add Task</AddButton>
        </CardHeader>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <AddTask />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: mintcream;
  font-family: "Montserrat", sans-serif;
  /* transition: 1s;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
  } */
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 55rem;
  grid-template-rows: 100px;
  grid-template-areas: "card-header";
  font-family: "Montserrat", sans-serif;
  border-radius: 15px;
  background: white;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 100px;
  position: relative;
  /* transition: 1s;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
  } */
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: card-header;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background: rgb(255, 99, 72);
  background: linear-gradient(
    120deg,
    rgba(255, 99, 72, 1) 21%,
    rgba(255, 22, 22, 1) 100%
  );
  color: white;
  font-size: 38px;
`;

const Date = styled.span`
  margin: 0;
  padding: 18px 24px;
  position: relative;
  color: black;
`;

const AddButton = styled.button`
  padding: 18px 24px;
  margin: 15px;
  border: none;
  border-radius: 15px;
  font-size: 26px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: transparent;
    outline: none;
  }

  &:focus {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: transparent;
    outline: none;
  }
`;

export default Tasks;
