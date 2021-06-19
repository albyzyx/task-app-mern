import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";
import { selectUser, signOut, clearState } from "../features/users/userSlice";

const Header = () => {
  const { user, isError, isSuccess, error } = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [onHome, setOnHome] = useState(false);

  const onSignOut = () => {
    dispatch(signOut());
    if (isSuccess) {
      dispatch(clearState());
      toast.success("Logged Out");
      history.push("/login");
    }
    if (isError) {
      toast.error(error.error);
      dispatch(clearState());
    }
  };

  const about = () => {
    setOnHome(false);
  };

  const home = () => {
    setOnHome(true);
  };

  return (
    <Container>
      <h1>Hello {user.displayName} !</h1>
      <ButtonPanel>
        <button onClick={onSignOut}>Logout</button>
        {onHome ? (
          <Link to="/about">
            <button onClick={about}>About</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={home}>Home</button>
          </Link>
        )}
      </ButtonPanel>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        pauseOnFocusLoss
        pauseOnHover
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 100%;
  position: sticky;

  h1 {
    letter-spacing: 2px;
    padding-left: 36px;
  }
`;

const ButtonPanel = styled.div`
  padding-right: 36px;
  button {
    text-transform: uppercase;
    text-align: center;
    font-size: 21px;
    margin: 10px;
    letter-spacing: 2px;
    color: #fff;
    border-radius: 3px;
    background-color: red;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    border: none;
    padding: 5px;

    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
      border: none;
      outline: none;
    }

    &:focus {
      background-color: rgba(255, 0, 0, 0.6);
      border: none;
      outline: none;
    }
  }
`;

export default Header;
