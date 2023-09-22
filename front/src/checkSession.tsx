import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { againLogin } from "./_actions/user_action";
import { store } from "./_reducers";

export function useCheckSession() {
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(againLogin());
  }, [dispatch]);
}
//   useEffect(() => {
//     if (accessToken && storedUser) {
//       setLoginStatus(true);
//     } else {
//       console.log("로그인되지 않은 상태입니다.");
//     }
//   }, [isLogin, accessToken, refreshToken]);
// }
