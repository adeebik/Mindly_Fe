import { Twitter, Youtube } from "lucide-react";
import Input from "../Input";
import Modal from "../Modal";
import Button from "../Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ContentType, useType } from "../../Store/store";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
}

export default function AddContentModal({ open, onClose }: AddContentProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const selectedtype = useType((state) => state.type);


  const setType = useType((state) => state.setType);

  async function addContent() {
    const title = titleRef.current?.value;
    const description = descRef.current?.value;
    const type = selectedtype;
    const link = linkRef.current?.value;

    try {
      await axios.post(
        `${BACKEND_URL + "/dashboard/create"}`,
        {
          title: title,
          type: type,
          description: description,
          link: link,
          tag: []
        },{
          headers: {
            Authorization: `${"Bearer " + localStorage.getItem("token")}`,
          }
        }
      );

    } catch (error) {
    }
  }

  return (
    <div>
      <Modal size="lg" title="Add Content" open={open} onClose={onClose}>
        <div className="">
          <Input reference={titleRef} placeholder="Enter title" label="Title" />

          <div className="txtarea flex flex-col gap-1 my-4">
            <label className="text-zinc-800 text-sm">
              Description (optional)
            </label>
            <textarea
              ref={descRef}
              className="resize-none border border-slate-300 px-2 py-3 rounded-lg text-sm focus:border-blue-500 focus:outline focus:outline-blue-500"
              name=""
              id=""
              placeholder="What's this about?"
            ></textarea>
          </div>

          <div className="ctype  flex flex-col gap-1 my-4">
            <label className="text-zinc-900 text-sm">Content Type</label>

            <div className="btns flex w-full gap-2">
              <button
                onClick={() => setType(ContentType.Youtube)}
                className={`border w-full border  px-2 py-3 rounded-lg flex justify-center items-center flex-col 
                  ${
                    selectedtype === ContentType.Youtube
                      ? " border-red-400 bg-red-50 text-red-500"
                      : "border-slate-300 text-sm text-slate-700"
                  }
                  `}
              >
                <Youtube /> Youtube
              </button>
              <button
                onClick={() => setType(ContentType.Twitter)}
                className={`border w-full border  px-2 py-3 rounded-lg flex justify-center items-center flex-col 
                  ${
                    selectedtype === ContentType.Twitter
                      ? " border-blue-400 bg-blue-50 text-blue-500"
                      : "border-slate-300 text-sm text-slate-700"
                  }
                  `}
              >
                <Twitter /> Twitter
              </button>
            </div>
          </div>

          <Input
            reference={linkRef}
            placeholder={
              selectedtype === ContentType.Youtube
                ? "https://youtube.com/watch?..."
                : "https://x.com/user/status/..."
            }
            label={
              selectedtype === ContentType.Youtube
                ? "Youtube Url"
                : "Twitter Url"
            }
          />

          <div className="endbtns flex gap-2 mt-8 mb-2">
            <Button
              variant="secondary"
              size="md"
              fullWidth={true}
              onclick={onClose}
              text="Cancel"
            ></Button>
            <Button
              onclick={addContent}
              type="submit"
              variant="primary"
              size="md"
              fullWidth={true}
              text="Add Content"
            ></Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
