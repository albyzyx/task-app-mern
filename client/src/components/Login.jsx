import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import loginImg from "./images/login.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  signIn,
  selectUser,
  clearState,
  isLoggedIn,
} from "../features/users/userSlice";
import Loading from "./Loading";

const Login = ({ onLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isFetching, error } =
    useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
    if (!user) {
      dispatch(isLoggedIn());
    }
    if (isError) {
      if (error.error) {
        toast.error(error.error);
        return dispatch(clearState());
      }
      error.errors.map((error) => {
        return toast.error(error);
      });
      dispatch(clearState());
    }
  }, [user, isError]);

  const setUser = (email, password) => {
    const user = {
      email,
      password,
    };
    dispatch(signIn(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    setUser(email, password);
    setEmail("");
    setPassword("");
  };

  return isFetching ? (
    <Loading />
  ) : (
    <LoginContainer>
      <LoginBox>
        <Container>
          <Form>
            <span>Login</span>
            <img src={loginImg} alt="login.svg" />
            <Content>
              <Wrap>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Wrap>
              <Wrap>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Wrap>
            </Content>
            <SubmitButton>
              <input type="submit" value="Login" onClick={onSubmit} />
            </SubmitButton>
            <Footer>
              <label htmlFor="register-link">
                Don't gave an Account?
                <Link to="/register">
                  <p>Register</p>
                </Link>
              </label>
            </Footer>
          </Form>
        </Container>
      </LoginBox>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        pauseOnHover
      />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  margin: 0%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 27em;
  height: 40em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5ex;
  position: relative;
  z-index: 99;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 12px 2px rgba(15, 15, 15, 0.3);
  border-radius: 4px;
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
  z-index: 99;
  font-family: "Montserrat", sans-serif;
  padding: 17px 10px;
  transition: transform 200ms ease-in-out;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;

  label {
    font-size: 20px;
  }

  input {
    margin-top: 6px;
    min-width: 18rem;
    height: 37px;
    padding: 0px 10px;
    font-size: 16px;
    background-color: #f3f3f3;
    border: 0px;
    border-radius: 4px;
    margin-bottom: 31px;
    transition: all 250ms ease-in-out;
  }

  input:focus {
    outline: none;
    box-shadow: 0px 0px 12px 0.8px #0281ce96;
  }
`;

const SubmitButton = styled.div`
  input {
    font-size: 21px;
    padding: 5px 20px;
    border: 0;
    background-color: #3498db;
    color: #fff;
    border-radius: 3px;
    transition: all 250ms ease-in-out;
    cursor: pointer;
  }

  input:hover {
    background-color: #2386c8;
  }

  input:focus {
    outline: none;
  }
`;

const Content = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 28px;
  }

  img {
    width: 21rem;
    height: 100%;
    object-fit: cover;
  }
`;

const Footer = styled.div`
  margin-top: 0.8rem;
  p {
    font-size: 18px;
    text-decoration: none;
  }
`;

export {
  LoginContainer,
  LoginBox,
  Container,
  Content,
  Wrap,
  SubmitButton,
  Footer,
  Form,
};

export default Login;
