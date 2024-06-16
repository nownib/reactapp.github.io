import { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {loginUser} from "../../services/userService";

const Login = (pros) => {
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

const handleLogin = async () => {
  setObjCheckInput(defaultValidInput);
  if(!valueLogin){
    setObjCheckInput({...defaultValidInput, isValidValueLogin: false})
    toast.error("Vui lòng nhập email or sđt")
    return
  }
  if(!password){
    setObjCheckInput({...defaultValidInput, isValidPassword: false})
    toast.error("Vui lòng nhập mật khẩu")
    return
  }
  
  let response = await loginUser(valueLogin, password);
  if(response && response.data && +response.data.EC === 0) {


    let data = {
      isAuthenticated: true,
      token:"fake token"
    }
    sessionStorage.setItem("account", JSON.stringify(data));
    history.push('/users')
    toast.success(response.data.EM);
  }

  if(response && response.data && +response.data.EC !== 0) {
    toast.error(response.data.EM);
  }

  // console.log('check response', response.data)
//Vì chỉ có 2 điều kiện nên k cần viết dài như register
}

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 col-sm-7 py-3">
            <div className="brand">Bin EC</div>
            <div className="detail d-none d-sm-block">learning evreything</div>
          </div>

          <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
            <input
              type="text"
              className={objCheckInput.isValidValueLogin ? "form-control" : "is-invalid form-control"}
              placeholder="Enter your email adress or phone number"
              value={valueLogin}
              onChange={(event)=> {setValueLogin(event.target.value)}}
            />
            <input
              type="password"
              className={objCheckInput.isValidPassword ? "form-control" : "is-invalid form-control"}
              placeholder="Password"
              value={password}
              onChange={(event)=> {setPassword(event.target.value)}}
            />
            <button className="btn btn-primary" onClick={()=>{handleLogin()}}>Login</button>
            <span className="text-center">
              <a href="#" className="forgot-password">
                Forgot your password
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}>
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
