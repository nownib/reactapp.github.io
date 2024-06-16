import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/ManageUsers/User";
import { useEffect } from "react";
import _ from "lodash";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <Router>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}

        <Switch>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="">404 not found</Route>
        </Switch>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
