import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <h1>Hello !</h1>
      <ButtonPanel>
        <button>Logout</button>
        <Link to="/about">
          <button>About</button>
        </Link>
      </ButtonPanel>
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
