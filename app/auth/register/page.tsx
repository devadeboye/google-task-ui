import SignUpForm from './SignUpForm';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-medium">Sign up</div>
        <div>Create a Google account</div>
      </div>

      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
