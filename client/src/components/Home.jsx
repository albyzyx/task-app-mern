import Header from "./Header.jsx";
import Tasks from "./Tasks.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, selectUser } from "../features/users/userSlice";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "./Loading.jsx";

const Home = () => {
  const { user, isSuccess } = useSelector(selectUser);
  const history = useHistory();
  const [userName, setUserName] = useState();

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    } else {
      history.push("/login");
    }
  }, [user]);

  return !isSuccess ? (
    <Loading />
  ) : (
    <div>
      {/* <Header /> */}
      <Tasks />
    </div>
  );
};

export default Home;
