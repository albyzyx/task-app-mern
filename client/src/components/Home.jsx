import Tasks from "./Tasks.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Loading from "./Loading.jsx";

const Home = () => {
  const { user, isSuccess } = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user]); //eslint-disable-line

  return !isSuccess ? (
    <Loading />
  ) : (
    <div>
      <Tasks />
    </div>
  );
};

export default Home;
