import { useDispatch, useSelector } from "react-redux";
import Reset from "./Reset";
import Router from "./Router";
import { RootState } from "./_reducers";
import { loginUser, setLoginStatus } from "./_actions/user_action";
import { useEffect } from "react";

function useCheckSession() {
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  const accessToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && storedUser) {
      dispatch(setLoginStatus(true));
    } else {
      console.log("로그인되지 않은 상태입니다.");
    }
  }, [isLogin, accessToken, storedUser]);
}

function App() {
  useCheckSession();

  return (
    <>
      <Reset />
      <Router />
    </>
  );
}

export default App;
