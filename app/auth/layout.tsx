import GoogleIcon from '../../components/ui/icons/google-icon';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 flex flex-col gap-6">
      <GoogleIcon className="w-12 h-12" height={48} width={48} />

      {children}
    </div>
  );
}
