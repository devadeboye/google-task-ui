import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-medium">Sign in</div>
        <div>Use your Google account</div>
      </div>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}
