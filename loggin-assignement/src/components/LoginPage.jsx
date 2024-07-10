import React from "react";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Back to your digital life</h1>
      <p className="subheading">Choose one of the option to go</p>
      <div className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <p className="continue-with">Or continue with</p>
        <div className="social-login">
          <button className="google">Google</button>
          <button className="meta">Meta</button>
          <button className="apple">Apple</button>
        </div>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default LoginPage;
