import { SignupForm } from "../components/signup-form";
import AuthLayout from "../components/auth-layout";

export default function SignPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
