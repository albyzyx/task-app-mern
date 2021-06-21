import React from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTasks,
  deleteTask,
  updateTask,
  clearTaskState,
} from "../features/tasks/taskSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = ({ id }) => {
  const { tasks, isSuccess, isError, error } = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.warn(error);
      dispatch(clearTaskState());
      return;
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const onDelete = (task) => {
    dispatch(deleteTask(task));
    if (isSuccess) {
      toast.success("Task Deleted!");
      return;
    }
  };

  const getDeadline = (deadline) => {
    const res = new Date(deadline);
    const date = res.toLocaleDateString();
    const time = res.toLocaleTimeString();
    return date + "  " + time;
  };

  const checkPriorityBorder = (task) => {
    if (task.important) {
      return {
        borderLeft: "6px solid black",
      };
    }
  };

  const makePriority = (task) => {
    const taskToUpdate = {
      id: task._id,
      completed: task.completed,
      important: !task.important,
    };
    dispatch(updateTask(taskToUpdate));
  };

  const makeCompleted = (task) => {
    const taskToUpdate = {
      id: task._id,
      completed: !task.completed,
      important: task.important,
    };
    dispatch(updateTask(taskToUpdate));
  };

  return tasks.map((task) => {
    return (
      task._id === id.toString() && (
        <Container
          key={task._id}
          onDoubleClick={() => makePriority(task)}
          style={checkPriorityBorder(task)}>
          <TaskContainer>
            <span>{task.description}</span>
            <FaTrash
              style={{
                cursor: "pointer",
                color: "red",
                size: "20px",
                fontSize: "24px",
              }}
              onClick={() => onDelete(task)}
            />
          </TaskContainer>
          <KeyContainer>
            <Deadline>Deadline : {getDeadline(task.deadline)}</Deadline>
            <Completed>
              {!task.completed ? (
                <>
                  <label htmlFor="completed">DONE</label>
                  <input
                    name="priority"
                    type="checkbox"
                    value={task.completed}
                    onChange={() => makeCompleted(task)}
                  />
                </>
              ) : (
                <>
                  {/* <label htmlFor="Yet to Complete">You Sure?</label>
                  <input
                    name="priority"
                    type="checkbox"
                    value={task.completed}
                    onChange={() => makeCompleted(task)}
                  /> */}
                </>
              )}
              {task.completed && (
                <label style={{ color: "blue" }}>Completed!</label>
              )}
            </Completed>
          </KeyContainer>
        </Container>
      )
    );
  });
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
  user-select: none;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
    border: none;
  }
`;

const KeyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  span {
    font-size: 30px;
  }
`;

const Deadline = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  margin-bottom: 15px;
  margin-right: 100px;
`;

const Completed = styled.div`
  /* display: flex;
  align-items: centers; */
  padding-left: 100px;

  input {
    min-width: 3rem;
    height: 24px;
    background-color: #f3f3f3;
    border: 0px;
    border-radius: 4px;
    transition: all 250ms ease-in-out;

    &:focus {
      outline: none;
      /* box-shadow: 0px 0px 12px 0.8px #0281ce96; */
    }
  }
`;

export default Task;
