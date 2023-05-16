import "./scss/Login.scss";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { lang } from "./lang";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = (): void => {
    console.log("on click login");
  };

  return (
    <div className="login-page">
      <div className="login-page__form">
        <label className="login-page__field-label">{lang.label.email}</label>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="login-page__field-label">{lang.label.password}</label>
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
        />

        <Button
          label={lang.button.login}
          className="login-page__button"
          onClick={onClickLogin}
        />
      </div>
    </div>
  );
}

export default Login;
