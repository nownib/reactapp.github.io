import { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const {user} = useContext(UserContext);

  // useEffect(() => {
    // console.log('check context', user)
    // let session = sessionStorage.getItem("account");
    // if (!session) {
    //   history.push("/login");
    // }
    // if(session) {
    //     //check role
    //   }
  // }, []);ko su dung Session -> Dung Context API
  if(user && user.isAuthenticated === true){
    return (
      <>
        <Route path={props.path} component={props.component} />
      </>
    );
  }else {
    return <Redirect to='/login'></Redirect>
  }
  
};

export default PrivateRoutes;
