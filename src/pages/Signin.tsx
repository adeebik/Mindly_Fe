import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";

export default function Signin() {
  return (
    <Auth title="Welcome Back" subtitle="Sign in to your account" redirectLink="" redirectText="Sign up" redirectTitle="Don't have an account? ">
      <>
        <Input label="Email" placeholder="you@example.com" type="mail" />
        <Input label="Password" placeholder="*******" type="password" />
        <Button
          variant="primary"
          size="md"
          text="Sign In"
          fullWidth={true}
          type="submit"
        />
      </>
    </Auth>
  );
}
