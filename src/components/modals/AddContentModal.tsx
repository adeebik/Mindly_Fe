import { Twitter, Youtube } from "lucide-react";
import Input from "../Input";
import Modal from "../Modal";
import Button from "../Button";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ContentType, useType, useTagsStore } from "../../Store/store";
import { Hash } from "lucide-react";

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

  const { tags, fetchTags } = useTagsStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    if (open) {
      fetchTags();
    }
  }, [open]);

  async function handleAddTag() {
    if (!newTagName.trim()) return;
    try {
      await axios.post(
        `${BACKEND_URL}/dashboard/tag`,
        { title: newTagName.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewTagName("");
      fetchTags();
    } catch (error) {
      console.error("Error creating tag", error);
    }
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }

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
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: `${"Bearer " + localStorage.getItem("token")}`,
          },
        },
      );
      setSelectedTags([]);
      onClose();
    } catch (error) {
      console.error("Error adding content", error);
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

          <div className="tags-section flex flex-col gap-1 my-4">
            <label className="text-zinc-900 text-sm">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => toggleTag(tag._id)}
                  className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-all ${
                    selectedTags.includes(tag._id)
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  <Hash size={10} /> {tag.title}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag..."
                className="flex-1 border border-slate-300 px-3 py-2 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button
                variant="secondary"
                size="sm"
                onclick={handleAddTag}
                text="Add"
              />
            </div>
          </div>

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
