import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SplashPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute>
          <Route path="/home">
              <Navigation isLoaded={isLoaded} />
              <HomePage />
          </Route>
          {/* <Route path="/home">
              <Navigation isLoaded={isLoaded} />
              <HomePage />
          </Route>
          <Route path="/home">
              <Navigation isLoaded={isLoaded} />
              <HomePage />
          </Route>
          <Route path="/home">
              <Navigation isLoaded={isLoaded} />
              <HomePage />
          </Route> */}
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
