import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const userMail = useRef<HTMLInputElement>(null);
  const userPass = useRef<HTMLInputElement>(null);

  async function signin() {
    setError(null);
    setMessage(null);
    const email = userMail.current?.value;
    const password = userPass.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL + "/users/signin"}`, {
        email,
        password,
      });

      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      setMessage(response.data.msg);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Authentication failed");
    }
  }

  return (
    <Auth
      title="Welcome Back"
      subtitle="Sign in to your account"
      redirectLink="/signup"
      redirectText="Sign up"
      redirectTitle="Don't have an account? "
      error={error}
      message={message}
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
