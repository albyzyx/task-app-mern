import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker"; //eslint-disable-line
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SubmitButton } from "./Login";
import {
  createTask,
  selectTasks,
  clearTaskState,
} from "../features/tasks/taskSlice";
import { useEffect } from "react";

const AddTask = ({ addTask }) => {
  const dispatch = useDispatch();
  const [description, setDesciption] = useState("");
  const [deadline, setDeadline] = useState("");
  const [important, setImportant] = useState();
  const { isSuccess, isError, error } = useSelector(selectTasks);
  const [showAddTask, setShowAddTask] = useState(addTask);

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(clearTaskState());
      return;
    }
  }, [isError]); //eslint-disable-line

  const setTask = ({ description, deadline, important }) => {
    const task = {
      description,
      deadline,
      important,
    };
    dispatch(createTask(task));
    if (isSuccess) {
      toast.success("Task Added!");
      setShowAddTask(!showAddTask);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      toast.warn("Please enter a Description");
      return;
    }
    if (!deadline) {
      toast.warn("Please enter a Deadline");
      return;
    }
    setTask({ description, deadline, important });
    setDesciption("");
    setDeadline("");
    setImportant(false);
  };
  return (
    showAddTask && (
      <>
        <Container>
          <Wrap>
            <label htmlFor="description">Task</label>
            <input
              name="description"
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
            />
          </Wrap>
          <Wrap>
            <label htmlFor="Deadline">Deadline</label>
            <input
              name="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            {/* <DatePicker
              required
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              placeholderText="Deadline"
            /> */}
          </Wrap>
          <Wrap>
            <label htmlFor="priority">Prioritize</label>
            <input
              name="priority"
              type="checkbox"
              value={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
          </Wrap>
          <SubmitButton>
            <input type="submit" value="ADD" onClick={onSubmit} />
          </SubmitButton>
        </Container>
      </>
    )
  );
};

const Container = styled.div`
  letter-spacing: 1.2px;
  margin-top: 50px;
  border-radius: 10px;
  padding: 24px;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  border-radius: 15px;
  background: white;
  /* background: transparent; */
  text-align: center;
  font-size: 28px;
`;

const Wrap = styled.div`
  display: grid;
  grid-gap: 75px;
  gap: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: start;
  margin: 10px;
  padding: 10px;
  padding-bottom: 15px;

  input {
    margin-top: 10px;
    min-width: 18rem;
    height: 37px;
    padding: 0px 10px;
    font-size: 18px;
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

export default AddTask;
