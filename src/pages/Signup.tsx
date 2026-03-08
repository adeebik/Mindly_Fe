import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  async function signup() {
    setError(null);
    setMessage(null);
    const username = nameRef.current?.value;
    const usermail = userRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !usermail || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL + "/users/signup"}`, {
        name: username,
        email: usermail,
        password: password,
      });

      setMessage("Signed up successfully! Redirecting...");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  }

  return (
    <Auth
      title="Create Account"
      subtitle="Start organizing your content"
      redirectLink="/signin"
      redirectText="Sign in"
      redirectTitle="Already have an account?"
      error={error}
      message={message}
    >
      <>
        <Input
          reference={nameRef}
          label="Name"
          placeholder="John Doe"
          type="text"
        />
        <Input
          reference={userRef}
          label="Email"
          placeholder="you@example.com"
          type="mail"
        />
        <Input
          reference={passRef}
          label="Password"
          placeholder="*******"
          type="password"
        />
        <Button
          variant="primary"
          size="md"
          text="Create Account"
          fullWidth={true}
          type="submit"
          onclick={signup}
        />
      </>
    </Auth>
  );
}
