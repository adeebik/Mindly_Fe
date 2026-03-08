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
}

interface filterStore {
  filter: Filters;
  setFilter: (arg: Filters) => void;
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

export const useFilterStore = create<filterStore>((set) => ({
  filter: Filters.All,
  setFilter: (filter: Filters) => {
    set({ filter: filter });
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
