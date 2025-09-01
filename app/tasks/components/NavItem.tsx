'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <li
        className={`text-sm font-medium flex flex-row items-center gap-2 h-8 px-4 rounded-3xl ${isActive ? 'bg-nav-active' : ''}`}
      >
        {icon}
        <span>{label}</span>
      </li>
    </Link>
  );
}
