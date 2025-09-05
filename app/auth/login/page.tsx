import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 lg:flex lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-4 lg:w-1/2">
        <div className="text-3xl font-medium">Sign in</div>
        <div>Use your Google account</div>
      </div>

      <div className="lg:w-1/2 lg:max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
