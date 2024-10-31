import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from '@react-oauth/google';
import "./test.css"

export default function TestGoogleAuth() {
  return (
    <div>
      <div
        className="text-layout"
      >
        <div>Google login</div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      <div style={{}}>
        <button onClick={googleLogout()}>LogOut</button>
      </div>
      </div>
    </div>
  );
}
