import { Plus, Twitter, Youtube } from "lucide-react";
import Button from "../components/Button";


export default function Sidebar({toggleModal} : {toggleModal: ()=>void}) {
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
          <button className="w-full flex p-2.5 text-sm flex-start focus:bg-blue-50 focus:text-blue-600 focus:font-medium rounded-md text-zinc-600 hover:bg-zinc-50 transition-all">
            All Content
          </button>
          <button className="w-full flex items-center gap-2 p-2.5 text-sm flex-start focus:bg-blue-50 focus:text-blue-600 focus:font-medium rounded-md text-zinc-600 hover:bg-zinc-50 transition-all">
            <Youtube size={20} /> Youtube
          </button>
          <button className="w-full flex items-center gap-2 p-2.5 text-sm flex-start focus:bg-blue-50 focus:text-blue-600 focus:font-medium rounded-md text-zinc-600 hover:bg-zinc-50 transition-all">
            <Twitter size={20} /> Twitter
          </button>
        </div>
      </div>

      <div className="count text-sm flex flex-col gap-1">
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Total</p>
          <p className="font-medium text-zinc-800">7</p>
        </div>
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Youtube</p>
          <p className="font-medium text-zinc-800">4</p>
        </div>
        <div className="total flex justify-between ">
          <p className="text-zinc-700">Twitter</p>
          <p className="font-medium text-zinc-800">3</p>
        </div>
      </div>
    </div>
  );
}
