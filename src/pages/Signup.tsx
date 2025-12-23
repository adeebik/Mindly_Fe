import { useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";
import axios from "axios";
import { BACKEND_URL } from "../config";


export default function Signup() {
  const nameRef = useRef<HTMLInputElement>();
  const userRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();

  async function signup (){
    const username = nameRef.current.value
    const usermail = userRef.current.value;
    const password = passRef.current.value;

    await axios.post(`${BACKEND_URL + "/users/signup"}`, {
      name: username,
      email: usermail,
      password: password
    } )
    alert("Signed Up!")
  }

  return (
     <Auth title="Create Account" subtitle="Start organizing your content" redirectLink="" redirectText="Sign in" redirectTitle="Already have an account?">
          <>
            <Input reference={nameRef} label="Name" placeholder="John Doe" type="text" />
            <Input reference={userRef} label="Email" placeholder="you@example.com" type="mail" />
            <Input reference={passRef} label="Password" placeholder="*******" type="password" />
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
  )
}

