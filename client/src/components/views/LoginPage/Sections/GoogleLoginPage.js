import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from "../../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { message } from "antd";
function GoogleLoginPage(props) {
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const dispatch = useDispatch();
  const responseGoogle = response => {
    dispatch(loginWithGoogle(response)).then(response => {
      if (response.payload.loginSuccess) {
        window.localStorage.setItem('x_token', response.payload.token);
        window.localStorage.setItem('x_tokenExp', response.payload.tokenExp);
        window.localStorage.setItem('userId', response.payload.userId);
        // console.log(response.payload)
        
        message.success(response.payload.msg);
    
        props.history.push("/");
      } else {
        // console.log(response.payload,'asd')
        setFormErrorMessage('Check out your Account or Password again')
      }
    });
  };

  return (
    <div className="pb-3">
      {formErrorMessage && (
        <label>
          <p
            style={{
              color: "#ff0000bf",
              fontSize: "0.7rem",
              border: "1px solid",
              padding: "1rem",
              borderRadius: "10px"
            }}
          >
            {formErrorMessage}
          </p>
        </label>
      )}
      <GoogleLogin
        // clientId는 공개, serverKey는 heroku에 저장 (그러나 직접쓰지않는 방안 필요)
        clientId={`544911758104-b8lug0lklhvquc4iafva0uqvqtng727l.apps.googleusercontent.com`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
}

export default withRouter(GoogleLoginPage);