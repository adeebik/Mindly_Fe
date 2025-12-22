import { Twitter, Youtube } from "lucide-react";
import Input from "../Input";
import Modal from "../Modal";
import Button from "../Button";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
}

export default function AddContentModal({ open, onClose }: AddContentProps) {
  return (
    <div>
      <Modal size="lg" title="Add Content" open={open} onClose={onClose}>
        <div className="">
          <Input placeholder="Enter title" label="Title" />

          <div className="txtarea flex flex-col gap-1 my-4">
            <label className="text-zinc-800 text-sm">
              Description (optional)
            </label>
            <textarea
              className="resize-none border border-slate-300 px-2 py-3 rounded-lg text-sm focus:border-blue-500 focus:outline focus:outline-blue-500"
              name=""
              id=""
              placeholder="What's this about?"
            ></textarea>
          </div>

          <div className="ctype  flex flex-col gap-1 my-4">
            <label className="text-zinc-800 text-sm">Content Type</label>
            <div className="btns flex w-full gap-2">
              <button className="w-full border border border-slate-300 px-2 py-3 rounded-lg text-sm text-slate-700 flex justify-center items-center flex-col gap-1 focus:border-blue-700 focus:bg-blue-50 focus:text-blue-500"> <Twitter /> Twitter</button>
              <button className="border w-full border border-slate-300 px-2 py-3 rounded-lg text-sm text-slate-700 flex justify-center items-center flex-col  focus:border-red-700 focus:bg-red-50 focus:text-red-500"> <Youtube /> Youtube</button>
            </div>
          </div>

          <Input placeholder="https://youtube.com/watch?..." label="Youtube Url" />
          
          <div className="endbtns flex gap-2 mt-8 mb-2">
            <Button variant="secondary" size="md" fullWidth={true} onclick={onClose} text="Cancel"></Button>
            <Button type="submit" variant="primary" size="md" fullWidth={true} text="Add Content"></Button>
          </div>

        </div>
      </Modal>
    </div>
  );
}
