import { create } from "zustand";
import { persist } from "zustand/middleware";

type LabelType = {
  slug: string;
  name: string;
  bgColor: string;
};

type SubcategoryType = {
  id: number;
  name: string;
};

type FocusCommunityType = {
  id: number;
  category: string;
  icon: string;
  preselect: boolean;
  subcategories: SubcategoryType[];
};

type CfgType = {
  labels: LabelType[];
  communities: FocusCommunityType[];
};

interface CfgStore {
  cfg: CfgType | null;
  setCfg: (cfg: CfgType) => void;
}

export const useConfigStore = create<CfgStore>()(
  persist(
    (set) => ({
      cfg: null,
      setCfg: (cfg: CfgType) => set({ cfg }),
    }),
    {
      name: "cfg-storage",
      getStorage: () => localStorage,
    },
  ),
);
