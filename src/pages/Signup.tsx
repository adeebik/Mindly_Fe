import { useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = nameRef.current?.value;
    const usermail = userRef.current?.value;
    const password = passRef.current?.value;

    await axios.post(`${BACKEND_URL + "/users/signup"}`, {
      name: username,
      email: usermail,
      password: password,
    });

    navigate("/signin");
    alert("Signed Up!");
  }

  return (
    <Auth
      title="Create Account"
      subtitle="Start organizing your content"
      redirectLink="/signin"
      redirectText="Sign in"
      redirectTitle="Already have an account?"
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
