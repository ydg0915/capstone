import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/Home";
import Chat from "./routes/Chat";
import CreateProject from "./routes/CreateProject";
import Profile from "./routes/Profile";
import Project from "./routes/Project";
import Login from "./routes/Login";
import Join from "./routes/Join";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EditProfile from "./routes/EditProfile";
import EditProject from "./routes/EditProject";
import React from "react";
import DeleteUser from "./routes/DeleteUser";
import FindId from "./routes/FindId";
import FindPassword from "./routes/FindPassword";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/findpassword">
          <FindPassword />
        </Route>
        <Route path="/findid">
          <FindId />
        </Route>
        <Route path="/deleteuser">
          <DeleteUser />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/createproject">
          <CreateProject />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/editProfile">
          <EditProfile />
        </Route>
        <Route path="/:projectId/editProject">
          <EditProject />
        </Route>
        <Route path="/:projectId">
          <Project />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
