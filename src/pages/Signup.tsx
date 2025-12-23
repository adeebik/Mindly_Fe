import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../Layout/Auth";


export default function Signup() {
  return (
     <Auth title="Create Account" subtitle="Start organizing your content" redirectLink="" redirectText="Sign in" redirectTitle="Already have an account?">
          <>
            <Input label="Name" placeholder="John Doe" type="text" />
            <Input label="Email" placeholder="you@example.com" type="mail" />
            <Input label="Password" placeholder="*******" type="password" />
            <Button
              variant="primary"
              size="md"
              text="Create Account"
              fullWidth={true}
              type="submit"
            />
          </>
        </Auth>
  )
}

