'use client';

import { CircleCheckBig, Menu } from 'lucide-react';
import { useMenuStore } from '../../lib/stores/menuStore';

export default function NavHeader() {
  const { toggleMenu } = useMenuStore();
  return (
    <div className="w-full flex flex-row items-center gap-4 h-12 px-4">
      <Menu color="var(--color-subtle-black)" onClick={toggleMenu} />
      <div className="flex flex-row items-center gap-2">
        <CircleCheckBig size={32} strokeWidth={4} color="#2684FC" />
        <h1 className="text-2xl text-subtle-black">Tasks</h1>
      </div>
    </div>
  );
}
