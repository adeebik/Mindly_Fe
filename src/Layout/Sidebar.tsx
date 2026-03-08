import { Hash, Plus, Trash2, Twitter, Youtube } from "lucide-react";
import Button from "../components/Button";
import { Filters, useTagsStore } from "../Store/store";
import { useEffect } from "react";

interface sideBarProps {
  selected: Filters;
  selectedTagIds: string[];
  setFilter: (Filters: Filters, tagId?: string | null) => void;
  toggleModal: () => void;
  totalCount: number;
  youtubeCount: number;
  twitterCount: number;
}

export default function Sidebar({
  totalCount,
  youtubeCount,
  twitterCount,
  selected,
  selectedTagIds,
  setFilter,
  toggleModal,
}: sideBarProps) {
  const { tags, fetchTags, deleteTag } = useTagsStore();

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDeleteTag = async (e: React.MouseEvent, tagId: string) => {
    e.stopPropagation();
    if (confirm("Delete this tag? It will be removed from all content.")) {
      await deleteTag(tagId);
    }
  };

  return (
    <div className="fixed flex flex-col mt-14 w-64 bg-white h-screen border-r border-zinc-200 p-4 gap-4 overflow-y-auto">
      <Button
        variant="primary"
        size="md"
        fullWidth={true}
        text="Add Content"
        startIcon={<Plus size={16} />}
        onclick={toggleModal}
      />
      <div className="border-b border-zinc-300 pb-3">
        <p className="text-xs mb-2 font-semibold text-gray-700 uppercase tracking-wide">
          Content type
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setFilter(Filters.All)}
            className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all
            ${
              selected == Filters.All
                ? "bg-blue-50 text-blue-700 font-medium"
                : " text-zinc-600 hover:bg-zinc-50 "
            }`}
          >
            All Content
          </button>
          <button
            onClick={() => setFilter(Filters.Youtube)}
            className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all gap-2 items-center
            ${
              selected == Filters.Youtube
                ? "bg-blue-50 text-blue-700 font-medium"
                : " text-zinc-600 hover:bg-zinc-50 "
            }`}
          >
            <Youtube size={16} /> Youtube
          </button>
          <button
            onClick={() => setFilter(Filters.Twitter)}
            className={`w-full flex p-2.5 text-sm flex-start rounded-md transition-all gap-2 items-center
            ${
              selected == Filters.Twitter
                ? "bg-blue-50 text-blue-700 font-medium"
                : " text-zinc-600 hover:bg-zinc-50 "
            }`}
          >
            <Twitter size={16} /> Twitter
          </button>
        </div>
      </div>

      <div className="tags-section border-b border-zinc-300 pb-3">
        <p className="text-xs mb-2 font-semibold text-gray-700 uppercase tracking-wide">
          Tags
        </p>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {tags.map((tag) => (
            <div
              key={tag._id}
              onClick={() => setFilter(Filters.Tag, tag._id)}
              className={`group w-full flex p-2.5 text-sm justify-between rounded-md transition-all gap-2 items-center cursor-pointer
              ${
                selected === Filters.Tag && selectedTagIds.includes(tag._id)
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : " text-zinc-600 hover:bg-zinc-50 "
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash size={14} /> {tag.title}
              </div>
              <button
                onClick={(e) => handleDeleteTag(e, tag._id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {tags.length === 0 && (
            <p className="text-xs text-zinc-400 p-2.5">No tags yet</p>
          )}
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
