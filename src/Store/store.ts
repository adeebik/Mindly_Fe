import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../config";

type modalStore = {
  isOpen: boolean;
  toggleModal: () => void;
};

interface AllContent {
  contents: {};
  isLoading: boolean;
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
  contents: {},
  isLoading: false,
  error: null,
  fetchContent: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BACKEND_URL + "/dashboard"}`, {
        headers: {
          Authorization: `${"Bearer " + localStorage.getItem("token")}`,
        },
      });
      const data = response.data.contents
      console.log("response", data);

      set({ contents: data });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
