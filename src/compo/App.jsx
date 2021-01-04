import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import "../style/App.css";
import Chat from "./Chat";
import Welcome from "./Welcome";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isUserSaved, login, logout } from "../action";

function App() {
  const User = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userLogged) => {
      if (userLogged) {
        dispatch(
          login({
            u: true,
            name: userLogged.displayName,
            email: userLogged.email,
            photo: userLogged.photoURL,
            uid: userLogged.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    dispatch(isUserSaved());
  }, [dispatch]);
  return (
    <div className="App">
      {User.u ? (
        <>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/:roomId" component={Chat} />
          </Switch>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
