import { CircleCheckBig, Star } from 'lucide-react';
import NavItem from './NavItem';

export default function SidebarNav() {
  return (
    <ul className="flex flex-col gap-1">
      <NavItem
        href="/tasks"
        icon={<CircleCheckBig size={20} />}
        label="All tasks"
      />
      <NavItem
        href="/tasks/list/~starred"
        icon={<Star size={20} />}
        label="Starred"
      />
    </ul>
  );
}
