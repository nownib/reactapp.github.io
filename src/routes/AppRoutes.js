import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/User";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import Home from "../components/Home/Home";
import About from "../components/About/About";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoutes path="/users" component={Users} />
        <Route path="">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
