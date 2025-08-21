import Link from 'next/link';
import Button from '../../../components/ui/Button';
import InputBox from '../../../components/ui/InputBox';

export default function SignUpForm() {
  return (
    <form action="" className="flex flex-col gap-4">
      <InputBox
        label="Username"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        focusBorderColor="focus:border-blue-800"
        focusRingColor="focus:ring-blue-800"
        focusLabelColor="text-blue-800"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
      />
      <InputBox
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        focusBorderColor="focus:border-blue-800"
        focusRingColor="focus:ring-blue-800"
        focusLabelColor="text-blue-800"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
      />

      <div className="flex flex-row-reverse gap-2 justify-between items-center">
        <Button
          type="submit"
          label="Sign up"
          variant="filled"
          size="large"
          className=""
        />
        <Link href="/auth/login" className="text-blue-600">
          sign in
        </Link>
      </div>
    </form>
  );
}
