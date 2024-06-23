import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/User";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/about">
          About
        </Route>
        <Route path="/project">
          Project
        </Route>
        <Route path="/" exact>
          home
        </Route>
        <PrivateRoutes path1="/users" component={Users} />
        <Route path="">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
