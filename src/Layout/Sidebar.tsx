import { Plus, Twitter, Youtube } from "lucide-react";
import Button from "../components/Button";
import { Filters } from "../Store/store";


interface sideBarProps {
  selected: Filters;
  setFilter: (Filters: Filters) => void;
  toggleModal: () => void;
  totalCount: number;
  youtubeCount: number;
  twitterCount: number;
}

export default function Sidebar( {totalCount,youtubeCount, twitterCount, selected , setFilter , toggleModal} : sideBarProps) {


  return (
    <div className="fixed flex flex-col mt-14 w-64 bg-white h-screen border-r border-zinc-200 p-4 gap-4">
      <Button
        variant="primary"
        size="md"
        fullWidth={true}
        text="Add Content"
        startIcon={<Plus size={16} />}
        onclick={toggleModal}
      />
      <div className="border-b border-zinc-300 ">
        <p className="text-xs mb-2 font-semibold text-gray-700 uppercase tracking-wide">
          Content type
        </p>
        <div className="flex flex-col gap-1 mb-3">
          <button onClick={()=>setFilter(Filters.All)} className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all
            ${selected == Filters.All ? "bg-blue-50 text-blue-700 font-medium" : " text-zinc-600 hover:bg-zinc-50 "}`}>
            All Content
          </button>
          <button onClick={()=>setFilter(Filters.Youtube)} className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all gap-2 items-center
            ${selected == Filters.Youtube ? "bg-blue-50 text-blue-700 font-medium" : " text-zinc-600 hover:bg-zinc-50 "}`}>
            <Youtube size={16} /> Youtube
          </button>
          <button onClick={()=>setFilter(Filters.Twitter)} className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all gap-2 items-center
            ${selected == Filters.Twitter ? "bg-blue-50 text-blue-700 font-medium" : " text-zinc-600 hover:bg-zinc-50 "}`}>
            <Twitter size={16} /> Twitter
          </button>
        </div>
      </div>

      <div className="count text-sm flex flex-col gap-1">
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Total</p>
          <p className="font-medium text-zinc-800">{totalCount}</p>
        </div>
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Youtube</p>
          <p className="font-medium text-zinc-800">{youtubeCount}</p>
        </div>
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Twitter</p>
          <p className="font-medium text-zinc-800">{twitterCount}</p>
        </div>
      </div>
    </div>
  );
}
