import React from 'react';
import { useLocation, useHistory} from "react-router";
import { useLogin } from "./LoginProvider";

export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const history = useHistory();
    const location = useLocation();
    const { login } = useLogin();

    function doLogin() {
        login();
        const redirectTo = location.state && location.state.redirectTo
            ? location.state.redirectTo
            : "/";
        history.replace(redirectTo);
    }

    function cancel() {
        history.replace("/");
    }

    const emailValid = email.length > 3 && email.includes("@");
    return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">You need to login to perform that action</h1>
      </div>

      <div className="LoginForm">
        <p>Please login with your E-Mail address</p>
        <input
          type="text"
          placeholder="Enter your email address here"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="ButtonBar">
          <button disabled={!emailValid} className="Button" onClick={doLogin}>
            Login
          </button>
          <button className="Button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    )
};