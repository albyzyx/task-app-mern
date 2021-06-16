import { useState } from "react";
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

const Register = ({ onRegister }) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please Enter an Email");
      return;
    }

    if (!password) {
      alert("Please Enter a Password");
      return;
    }

    onRegister({ username, email, password });

    setUser(true);

    setName("");
    setEmail("");
    setPassword("");
  };

  if (user) {
    return <Redirect to="/" />;
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
                  value={username}
                  onChange={(e) => setName(e.target.value)}
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
