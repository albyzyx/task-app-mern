const [user, setUser] = useState();
const [loading, setLoading] = useState(false);

const handleRegister = async ({ username, email, password }) => {
  const req = {
    username,
    email,
    password,
  };

  setUser(req);
  console.log(user);

  // try {
  //   let res = await fetch("/api/users", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(req),
  //   });
  //   let currentUser = await res.json();

  //   console.log(currentUser);
  // } catch (error) {
  //   console.log(error);
  // }
};

const handleLogin = async ({ email, password }) => {
  let req = {
    email,
    password,
  };
  setUser(req);
  console.log(user);

  // try {
  //   let res = await fetch("/api/users/login", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(req),
  //   });
  //   let currentUser = await res.json();

  //   console.log(currentUser);
  // } catch (error) {
  //   console.log(error);
  // }
};

const SplashScreen = ({ user }) => {
  if (user) {
    return <Home user={user} />;
  }
  return (
    <div>
      <Redirect to="/login" />;
    </div>
  );
};

<Route exact path="/">
  <SplashScreen user={user} />
</Route>;
