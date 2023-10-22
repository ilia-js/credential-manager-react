import "./Login.scss";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { lang } from "lang";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useLogin } from "hooks/useLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const useOnClickLogin = async (): Promise<void> => {
    await useLogin(navigate, email, password);
  };

  return (
    <div className="login-page">
      <div className="login-page__form">
        <div className="login-page__title">{lang.title.login}</div>
        <label className="login-page__field-label">{lang.label.email}</label>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="login-page__field-label">{lang.label.password}</label>
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
        />

        <div className="login-page__button-container">
          <Button
            label={lang.button.login}
            onClick={useOnClickLogin}
            disabled={!email || !password}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
