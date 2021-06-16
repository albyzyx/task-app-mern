import React from "react";
import styled from "styled-components";
import { SubmitButton } from "./Login";

const AddTask = () => {
  return (
    <Container>
      <Wrap>
        <label htmlFor="description">Task</label>
        <input
          name="description"
          type="text"
          placeholder="Task Description"
          //   value={}
          //   onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Wrap>
      <Wrap>
        <label htmlFor="Deadline">Deadline</label>
        <input
          name="deadline"
          type="datetime-local"
          //   value={}
          //   onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Wrap>
      <Wrap>
        <label htmlFor="priority">Prioritize</label>
        <input
          name="priority"
          type="checkbox"
          //   value={}
          //   onChange={(e) => setEmail(e.target.value)}
        />
      </Wrap>
      <SubmitButton>
        <input type="submit" value="ADD" />
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  letter-spacing: 1.2px;
  margin: 10px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 24px;
  font-size: 24px;
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
