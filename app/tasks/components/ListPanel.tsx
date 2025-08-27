import CollapsiblePanel from '@/components/ui/CollapsiblePanel';
import ListPanelItem from './ListPanelItem';

export default function ListPanel() {
  return (
    <div className="">
      <CollapsiblePanel title="Lists" defaultOpen={true}>
        <ListPanelItem title="My Tasks" count={10} />
        <ListPanelItem title="test list" count={2} />
      </CollapsiblePanel>
    </div>
  );
}
