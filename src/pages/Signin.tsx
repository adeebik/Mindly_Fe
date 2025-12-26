import { useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signin() {

  const navigate = useNavigate();

  const userMail = useRef<HTMLInputElement>(null);
  const userPass = useRef<HTMLInputElement>(null);

  async function signin() {
    const email = userMail.current?.value;
    const password = userPass.current?.value;

    const response = await axios.post(`${BACKEND_URL + "/users/signin"}`, {
      email,
      password,
    });

    const jwtToken = response.data.token;
    localStorage.setItem("token", jwtToken);
    navigate("/dashboard")

    alert(response.data.msg);
  }

  return (
    <Auth
      title="Welcome Back"
      subtitle="Sign in to your account"
      redirectLink="/signup"
      redirectText="Sign up"
      redirectTitle="Don't have an account? "
    >
      <>
        <Input
          reference={userMail}
          label="Email"
          placeholder="you@example.com"
          type="mail"
        />
        <Input
          reference={userPass}
          label="Password"
          placeholder="*******"
          type="password"
        />
        <Button
          variant="primary"
          size="md"
          text="Sign In"
          fullWidth={true}
          type="submit"
          onclick={signin}
        />
      </>
    </Auth>
  );
}
