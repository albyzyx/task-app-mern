/* eslint-disable */
import Tasks from "./Tasks.jsx";
import AddTask from "./AddTask.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "./Loading.jsx";
import styled from "styled-components";
import { selectTasks } from "../features/tasks/taskSlice";
import homeBackground from "./images/homeBackground.svg";

const Home = () => {
  const { user, isSuccess } = useSelector(selectUser);
  const history = useHistory();
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useSelector(selectTasks);

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user]); //eslint-disable-line

  const onAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const getLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.map((date) => {
      count += tasks[date].length;
    });
    return count;
  };

  return !isSuccess ? (
    <Loading />
  ) : (
    <Container>
      <SecondaryBar>
        <SecondaryHeader>
          <AddButton onClick={onAddTask}>Add Task</AddButton>
          <TaskCount>Total Tasks : {getLength()}</TaskCount>
        </SecondaryHeader>
        {showAddTask && <AddTask addTask={showAddTask} />}
      </SecondaryBar>
      <Tasks />;
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: url(${homeBackground});
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondaryBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SecondaryHeader = styled.div`
  border: 1px solid red;
  height: 5rem;
  width: 60em;
  margin-top: 50px;
  display: flex;
  border-radius: 9px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    120deg,
    rgba(255, 99, 72, 1) 21%,
    rgba(255, 22, 22, 1) 100%
  );
  font-family: "Montserrat", sans-serif;
`;

const AddButton = styled.button`
  padding: 10px 18px;
  margin: 15px;
  border: none;
  border-radius: 15px;
  font-size: 26px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  &:hover {
    /* background: transparent;
    color: white; */
    border: transparent;
    outline: none;
  }

  &:focus {
    /* background: transparent;
    color: white; */
    border: transparent;
    outline: none;
  }
`;

const TaskCount = styled.p`
  padding: 18px 24px;
  margin: 15px;
  border: none;
  font-size: 26px;
  background-color: transparent;
  color: white;
`;

export default Home;
