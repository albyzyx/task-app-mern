import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
import {
  setSignUpState,
  selectUser,
  selectError,
} from "../features/users/userSlice";

const Register = ({ onRegister }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const userForm = {
    displayName: "",
    email: "",
    password: "",
  };

  useEffect(() => {}, [user]);

  const setUser = (user) => {
    dispatch(setSignUpState(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!userForm.email) {
      alert("Please Enter an Email");
      return;
    }

    if (!userForm.password) {
      alert("Please Enter a Password");
      return;
    }

    setUser(userForm);
    if (user) {
      history.push("/");
    }
    userForm.setName("");
    userForm.setEmail("");
    userForm.setPassword("");
  };

  if (error) {
    alert(error);
  }

  return (
    <LoginContainer>
      <LoginBox>
        <Container>
          <Form onSubmit={onSubmit}>
            <span>Register</span>
            <img src={loginImg} alt="login.svg" />
            <Content>
              <Wrap>
                <label htmlFor="username">USERNAME</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Name"
                  // value={username}
                  onChange={(e) => (userForm.displayName = e.target.value)}
                />
              </Wrap>
              <Wrap>
                <label htmlFor="email">EMAIL</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  // value={email}
                  onChange={(e) => (userForm.email = e.target.value)}
                  required
                />
              </Wrap>
              <Wrap>
                <label htmlFor="password">PASSWORD</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  // value={password}
                  onChange={(e) => (userForm.password = e.target.value)}
                  required
                />
              </Wrap>
            </Content>
            <SubmitButton>
              <input type="submit" value="Register" className="btn" />
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
