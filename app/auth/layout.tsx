import GoogleIcon from '../../components/ui/icons/google-icon';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:bg-surface-container md:h-screen md:flex md:items-center md:justify-center md:w-full">
      <div className="flex flex-col p-6 gap-6 mobile-auth-layout md:w-11/12 md:max-w-md md:rounded-3xl md:p-6 md:shadow-gray-300 md:bg-white lg:w-10/12 lg:max-w-4xl">
        <GoogleIcon className="w-12 h-12" height={48} width={48} />

        {children}
      </div>
    </div>
  );
}
