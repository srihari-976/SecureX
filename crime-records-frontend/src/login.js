import React from "react";

const Login = () => {
  return (
    <div className="container signup-container">
      <div className="row justify-content-end">
        <div className="col-md-11 offset-7">
          <div className="form-wrapper">
            <div className="heading">
              <center>
                <br />
                <h2>Welcome</h2>
                <p>
                  Sign in to your account to continue.
                  <br />
                </p>
              </center>
            </div>
            <form id="form1" method="post">
              <div className="form-group">
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  required=""
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-success"
                />
              </div>
            </form>
            <div className="mssg bg-danger">
              <span id="check"></span>
            </div>
            <div id="LangTable">
              <a href="/profile" id="aa"></a>
            </div>
            <div>
              <span>Do you forgot password?</span>
              <a href="/forgetpass">Click here</a>
            </div>
            <div>
              <span>Create a new Account?</span>
              <a href="/sign">Register here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
