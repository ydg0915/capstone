import Router from "./Router";
import React from "react";

import { useCheckSession } from "./checkSession";

function App() {
  useCheckSession();

  return (
    <>
      <Router />
    </>
  );
}

export default App;
