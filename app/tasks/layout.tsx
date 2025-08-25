import NavHeader from "../../components/ui/NavHeader";
import Sidebar from "./components/Sidebar";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-tasks-surface-container-highest h-screen color-subtle-black flex flex-col">
      <NavHeader />
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}