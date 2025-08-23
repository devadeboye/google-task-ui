import Link from 'next/link';
import Button from '../../../components/ui/Button';
import InputBox from '../../../components/ui/InputBox';

export default function LoginForm() {
  return (
    <form action="" className="flex flex-col gap-6">
      <InputBox
        label="Username"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        focusBorderColor="focus:border-primary"
        focusRingColor="focus:ring-primary"
        focusLabelColor="text-primary"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
      />

      <div className="flex flex-col gap-2">
        <InputBox
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          focusBorderColor="focus:border-primary"
          focusRingColor="focus:ring-primary"
          focusLabelColor="text-primary"
          defaultLabelColor="text-gray-800"
          borderColor="border-gray-500"
        />
        <div className="flex flex-row gap-2 items-center">
          <span>Forgot password?</span>
          <Link href="/auth/reset-password" className="text-primary">
            Reset password
          </Link>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-2 justify-between items-center">
        <Button
          type="submit"
          label="Sign in"
          variant="filled"
          size="large"
          className="rounded-3xl!"
        />
        <Link href="/auth/register" className="text-primary">
          create an account
        </Link>
      </div>
    </form>
  );
}
