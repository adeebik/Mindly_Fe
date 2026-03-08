import { useEffect } from "react";
import Card from "../components/Card";
import AddContentModal from "../components/modals/AddContentModal";
import BrainShareModal from "../components/modals/BrainShareModal";
import ShareComponentModal from "../components/modals/ShareComponentModal";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";
import {
  Filters,
  useAddModalStore,
  useAllContentsStore,
  useBrainShareModalStore,
  useBrainShareStatusStore,
  useContentShareStore,
  useFilterStore,
  useShareModalStore,
  useTagsStore,
} from "../Store/store";
import axios from "axios";
import { BACKEND_URL } from "../config";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { useState } from "react";

export default function Dashboard() {
  const addmodal = useAddModalStore((state) => state.isOpen);
  const toggleAdd = useAddModalStore((state) => state.toggleModal);

  const sharemodal = useShareModalStore((state) => state.isOpen);
  const ShareId = useShareModalStore((state) => state.contentId);
  const toggleShare = useShareModalStore((state) => state.toggleModal);

  const brainmodal = useBrainShareModalStore((state) => state.isOpen);
  const toggleBrain = useBrainShareModalStore((state) => state.toggleModal);

  const { contents, fetchContent, loading } = useAllContentsStore();

  const selectedFilter = useFilterStore((state) => state.filter);
  const selectedTagIds = useFilterStore((state) => state.tagIds);
  const setSelectedFilter = useFilterStore((state) => state.setFilter);

  const { sharedContents, isloading, toggleContent, fetchSharedContents } = useContentShareStore();
  const { fetchTags } = useTagsStore();
  const { fetchStatus } = useBrainShareStatusStore();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);

  const filtered =
    selectedFilter === Filters.All
      ? contents
      : selectedFilter === Filters.Tag
      ? contents.filter((c) => 
          selectedTagIds.every((tagId) => c.tags.some((t) => t._id === tagId))
        )
      : contents.filter((c) => c.type === selectedFilter);

  async function confirmDelete() {
    if (!itemToDelete) return;
    try {
      await axios.post(
        `${BACKEND_URL + "/dashboard/delete"}`,
        {
          contentId: itemToDelete.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      fetchContent();
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  }

  function handleDelete(_id: string, title: string) {
    setItemToDelete({ id: _id, title });
    setDeleteModalOpen(true);
  }
  
  useEffect(() => {
    fetchSharedContents();
    fetchTags();
    fetchStatus();
  }, []);

  useEffect(() => {
    fetchContent();

    let interval = setInterval(() => {
      fetchContent();
      console.log("refreshing");
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [addmodal]);

  const username =
    contents.length > 0 && contents[0]?.userId?.name
      ? contents[0].userId.name
      : "User";

  return (
    <>
      <Navbar username={username} toggleModal={toggleBrain} />
      <Sidebar
        selected={selectedFilter}
        selectedTagIds={selectedTagIds}
        setFilter={setSelectedFilter}
        toggleModal={toggleAdd}
        totalCount={contents.length}
        youtubeCount={contents.filter((c) => c.type === "youtube").length}
        twitterCount={contents.filter((c) => c.type === "twitter").length}
      />

      {loading && contents.length === 0 ? (
        <div className="main ml-64 pt-14 bg-zinc-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading your content...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="main ml-64 pt-14 bg-slate-100 min-h-screen">
            <div className="inside p-5">
              <div className="title mb-5">
                <p className="text-xl font-medium text-zinc-800">All Content</p>
                <p className="text-sm text-zinc-600">{contents.length} items</p>
              </div>
              <div className="card">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-4 space-y-4">
                  {filtered.map((content) => (
                    <div key={content._id} className="break-inside-avoid mb-4">
                      <Card
                        sharedContents={sharedContents}
                        content={content}
                        onShare={toggleShare}
                        onDelete={handleDelete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ShareComponentModal
            open={sharemodal}
            onClose={toggleShare}
            onToggleShare={toggleContent}
            sharedContents={sharedContents}
            loading={isloading}
            contentId={ShareId}
          />

          <BrainShareModal open={brainmodal} onClose={toggleBrain} />
          <AddContentModal open={addmodal} onClose={toggleAdd} />
          <DeleteConfirmationModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={itemToDelete?.title || ""}
          />
        </>
      )}
    </>
  );
}
