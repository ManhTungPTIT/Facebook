import LoginFrom from "./LoginFrom";
import ListAccount from "./ListAccount";
import "./Login.scss";

function Login() {
  return (
    <div className="contain">
      <ListAccount />
      <LoginFrom />
    </div>
  );
}

export default Login;
