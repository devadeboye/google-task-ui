import { CircleCheckBig, Menu } from "lucide-react";

export default function NavHeader() {
  return (
    <div className="w-full flex flex-row items-center gap-4 h-12 px-4">
      <Menu color="var(--color-subtle-black)" />
      <div className="flex flex-row items-center gap-2">
        <CircleCheckBig size={32} strokeWidth={4} color="#1D63E9" />
        <h1 className="text-2xl text-subtle-black">Tasks</h1>
      </div>
    </div>
  );
}