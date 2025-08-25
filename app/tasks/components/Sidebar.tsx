import { PlusIcon } from "lucide-react";
import Button from "../../../components/ui/Button";
import ListPanel from "./ListPanel";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white px-3 flex flex-col gap-8">
      <div></div>
      <SidebarNav />
      <ListPanel />
      <Button label="Create new list" variant="text" size="medium"  className="max-w-fit px-3!" textColor="text-black" fontWeight="normal" icon={<PlusIcon />}/>
    </aside>
  );
}