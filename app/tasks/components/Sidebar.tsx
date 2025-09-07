'use client';

import { PlusIcon } from 'lucide-react';
import Button from '../../../components/ui/Button';
import ExtendedFab from '../../../components/ui/ExtendedFab';
import { useMenuStore } from '../../../lib/stores/menuStore';
import ListPanel from './ListPanel';
import SidebarNav from './SidebarNav';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen } = useMenuStore();

  return (
    <aside
      className={`h-full bg-tasks-surface-container-highest px-3 flex flex-col gap-6 transition-all duration-300 ease-in-out ${className} ${isOpen ? 'translate-x-0 shadow-md/40 md:shadow-none' : '-translate-x-full md:hidden'}`}
    >
      <div></div>
      <ExtendedFab
        label="Create"
        icon={<PlusIcon />}
        variant="tertiary"
        size="small"
        className="bg-white"
      />
      <SidebarNav />
      <ListPanel />
      <Button
        label="Create new list"
        variant="text"
        size="medium"
        className="max-w-fit px-3!"
        textColor="text-black"
        fontWeight="normal"
        icon={<PlusIcon />}
      />
    </aside>
  );
}
