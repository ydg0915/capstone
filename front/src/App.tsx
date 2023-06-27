import Reset from "./Reset";
import Router from "./Router";
import React from "react";

import { useCheckSession } from "./checkSession";

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
