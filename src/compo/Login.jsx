import React from "react";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e));
  };
  return (
    <div className="login">
      <div className="center">
        <div className="logoImage">
          <img
            src="https://www.pngkit.com/png/full/19-191133_discord-logo-png-transparent-graphic-discord.png"
            alt="djfs"
          />
        </div>
        <button onClick={signIn}>Sign In With Google</button>
      </div>
    </div>
  );
}

export default Login;
