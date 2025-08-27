import NavHeader from '../../components/ui/NavHeader';
import Sidebar from './components/Sidebar';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-tasks-surface-container-highest h-screen color-subtle-black flex flex-col w-fit">
      <NavHeader />
      <div className="flex flex-row flex-1 relative">
        <Sidebar className={`w-64 absolute left-0 top-0`} />
        <div className="w-svw">{children}</div>
      </div>
    </div>
  );
}
