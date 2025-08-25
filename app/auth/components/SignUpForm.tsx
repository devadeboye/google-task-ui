import Link from 'next/link';
import Button from '../../../components/ui/Button';
import InputBox from '../../../components/ui/InputBox';

export default function SignUpForm() {
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

      <div className="flex flex-row-reverse gap-2 justify-between items-center">
        <Button
          type="submit"
          label="Sign up"
          variant="filled"
          size="large"
          className="rounded-3xl!"
        />
        <Link href="/auth/login" className="text-primary">
          sign in
        </Link>
      </div>
    </form>
  );
}
