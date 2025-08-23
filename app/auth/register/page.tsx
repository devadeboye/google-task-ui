import SignUpForm from './SignUpForm';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 mobile-auth-page lg:flex lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-4 mobile-auth-page-header lg:w-1/2">
        <div className="text-3xl font-medium">Sign up</div>
        <div>Create a Google account</div>
      </div>

      <div className="mobile-auth-page-header lg:w-1/2 lg:max-w-lg">
        <SignUpForm />
      </div>
    </div>
  );
}
