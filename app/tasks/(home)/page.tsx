'use client';

import { useMenuStore } from '../../../lib/stores/menuStore';
import Taskboard from '../components/Taskboard';

export default function TasksPage() {
  const { isOpen } = useMenuStore();

  return (
    <main
      className={`flex flex-col gap-6 p-6 md:grid ${isOpen ? 'md:grid-cols-1 lg:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}
    >
      <Taskboard />
      <Taskboard />
      <Taskboard />
    </main>
  );
}
