import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "./images/login.svg";
import {
  LoginContainer,
  LoginBox,
  Container,
  Content,
  Wrap,
  SubmitButton,
  Footer,
  Form,
} from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser, signUp, clearState } from "../features/users/userSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ onRegister }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isError, isSuccess, isFetching, error } = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
    if (isError) {
      console.log(error);
      error.errors.map((error) => {
        return toast.error(error);
      });
      dispatch(clearState());
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const setUser = (userName, email, password) => {
    const user = {
      displayName,
      email,
      password,
    };
    dispatch(signUp(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!displayName) {
      toast.warn("Please enter a user name");
      return;
    }

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    setUser(displayName, email, password);
    setDisplayName("");
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
            <span>Register</span>
            <img src={loginImg} alt="login.svg" />
            <Content>
              <Wrap>
                <label htmlFor="username">USERNAME</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </Wrap>
              <Wrap>
                <label htmlFor="email">EMAIL</label>
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
                <label htmlFor="password">PASSWORD</label>
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
              <input type="submit" value="Register" onClick={onSubmit} />
            </SubmitButton>
            <Footer>
              <label htmlFor="register-link">
                Already have an Account?
                <Link to="/login">
                  <p>Login</p>
                </Link>
              </label>
            </Footer>
          </Form>
        </Container>
      </LoginBox>
    </LoginContainer>
  );
};

export default Register;
