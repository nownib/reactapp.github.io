import "./Login.scss";

const Login = (pros) => {
  return (
    <div className="login-container mt-3">
      <div className="container">
        <div className="row">
          <div className="content-left red col-7">
            <div className="brand">Bin EC</div>
            <div>learning evreything</div>
          </div>
          <div className="content-right green col-5 d-flex flex-column gap-3 py-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email adress or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center">Forgot your password</span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
