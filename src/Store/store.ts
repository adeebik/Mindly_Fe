import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../config";
import { Contents } from "../Types/types";

type modalStore = {
  isOpen: boolean;
  toggleModal: () => void;
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

export const useShareModalStore = create<modalStore>((set) => ({
  isOpen: false,
  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen }));
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
      const response = await axios.get(`${BACKEND_URL + "/dashboard"}`, {
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



export enum Filters {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
}

interface filterStore {
  filter: Filters;
  setFilter: (arg: Filters) => void;
}

export const useFilterStore = create<filterStore>((set) => ({
  filter: Filters.All,
  setFilter: (filter: Filters) => {
    set({ filter: filter });
  },
}));
