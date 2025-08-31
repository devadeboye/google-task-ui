import Checkbox from '@/components/ui/Checkbox';

interface ListPanelItemProps {
  title: string;
  count: number;
}

export default function ListPanelItem({ title, count }: ListPanelItemProps) {
  return (
    <div className="flex flex-row items-center gap-3 h-8 text-subtle-black justify-center">
      <Checkbox id={title.toLowerCase().replace(/\s+/g, '-')} />
      <span className="text-sm font-medium flex-1">{title}</span>
      <span className="text-xs font-medium">{count}</span>
    </div>
  );
}
