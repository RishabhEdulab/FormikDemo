import React, { useState } from "react";
import logo from "./logo.svg";
import CoustomValidateFunction from "./component/coustomValidateFunction";
import SchemaValidation from "./component/schemaValidation";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./component/Login";
import HomePage from "./component/Home";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SchemaValidation}></Route>
        <Route
          path="/Login"
          component={() => (
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        ></Route>
        <Route
          path="/home"
          component={() => <HomePage isAuthenticated={isAuthenticated} />}
        ></Route>
      </Switch>
      {/* <CoustomValidateFunction></CoustomValidateFunction> */}
      {/* <SchemaValidation/> */}
    </div>
  );
}

export default App;
