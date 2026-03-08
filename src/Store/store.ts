import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../config";
import { Contents } from "../Types/types";

type modalStore = {
  isOpen: boolean;
  toggleModal: () => void;
};

type sharemodalStore = {
  isOpen: boolean;
  contentId: string;
  toggleModal: (contentId?: string) => void;
};

interface AllContent {
  contents: Contents[];
  loading: boolean;
  error: any;
  fetchContent: () => void;
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface userType {
  type: ContentType;
  setType: (arg: ContentType) => void;
}

export enum Filters {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
  Tag = "tag",
}

interface filterStore {
  filter: Filters;
  tagIds: string[];
  setFilter: (arg: Filters, tagId?: string | null) => void;
}

export const useType = create<userType>((set) => ({
  type: ContentType.Youtube,
  setType: (type) => {
    set({ type });
  },
}));

export const useAddModalStore = create<modalStore>((set) => ({
  isOpen: false,
  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

export const useShareModalStore = create<sharemodalStore>((set) => ({
  isOpen: false,
  contentId: "",
  toggleModal: (contentId = "") => {
    set((state) => ({
      isOpen: !state.isOpen,
      contentId: state.isOpen ? "" : contentId,
    }));
  },
}));

export const useBrainShareModalStore = create<modalStore>((set) => ({
  isOpen: false,
  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

export const useAllContentsStore = create<AllContent>((set) => ({
  contents: [],
  loading: false,
  error: null,
  fetchContent: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data.contents;

      set({ contents: data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({
        error: "Failed to fetch contents",
        loading: false,
      });
    }
  },
}));

export interface Tag {
  _id: string;
  title: string;
}

interface tagStore {
  tags: Tag[];
  loading: boolean;
  fetchTags: () => void;
  deleteTag: (tagId: string) => Promise<void>;
}

export const useTagsStore = create<tagStore>((set) => ({
  tags: [],
  loading: false,
  fetchTags: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BACKEND_URL}/dashboard/tags`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ tags: response.data.tags, loading: false });
    } catch (error) {
      console.error("Error fetching tags:", error);
      set({ loading: false });
    }
  },
  deleteTag: async (tagId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/dashboard/tag/${tagId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set((state) => ({
        tags: state.tags.filter((t) => t._id !== tagId),
      }));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  },
}));

export const useFilterStore = create<filterStore>((set) => ({
  filter: Filters.All,
  tagIds: [],
  setFilter: (filter: Filters, tagId: string | null = null) => {
    set((state) => {
      if (filter !== Filters.Tag) {
        return { filter, tagIds: [] };
      }

      if (!tagId) return state;

      const newTagIds = state.tagIds.includes(tagId)
        ? state.tagIds.filter((id) => id !== tagId)
        : [...state.tagIds, tagId];

      return {
        filter: newTagIds.length > 0 ? Filters.Tag : Filters.All,
        tagIds: newTagIds,
      };
    });
  },
}));

export type SharedCont = {
  link: string;
  isShared: boolean;
};

interface ContentShareStore {
  sharedContents: Record<string, SharedCont>;
  isloading: string | null;
  error: any;
  toggleContent: (contentId: string, share: boolean) => void;
  fetchSharedContents: () => void;
}

export const useContentShareStore = create<ContentShareStore>((set, get) => ({
  sharedContents: {},
  isloading: null,
  error: null,

  toggleContent: async (contentId, share) => {
    set({ isloading: contentId });
    try {
      const response = await axios.post(
        `${BACKEND_URL}/share/contentShare`,
        {
          contentId: contentId,
          share: share,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (share) {
        const getlink = response.data.link;
        set((state) => ({
          sharedContents: {
            ...state.sharedContents,
            [contentId]: { link: getlink, isShared: true },
          },
          isloading: null,
        }));
      } else {
        const updatedContents = { ...get().sharedContents };
        delete updatedContents[contentId];
        set({
          sharedContents: updatedContents,
          isloading: null,
        });
      }
    } catch (error) {}
  },

  fetchSharedContents: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/share/contentShare`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ sharedContents: response.data.sharedContents });
    } catch (error) {
      console.error("Fetch shared contents error:", error);
    }
  },
}));
interface BrainShareStatus {
  isShared: boolean;
  shareLink: string;
  loading: boolean;
  fetchStatus: () => Promise<void>;
  setStatus: (shared: boolean, link: string) => void;
}

export const useBrainShareStatusStore = create<BrainShareStatus>((set) => ({
  isShared: false,
  shareLink: "",
  loading: false,
  fetchStatus: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BACKEND_URL}/share/mindShare`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.isShared) {
        set({ isShared: true, shareLink: response.data.link, loading: false });
      } else {
        set({ isShared: false, shareLink: "", loading: false });
      }
    } catch (error) {
      console.error("Fetch brain share status error:", error);
      set({ isShared: false, shareLink: "", loading: false });
    }
  },
  setStatus: (isShared, shareLink) => {
    set({ isShared, shareLink });
  },
}));
