import { ReactNode } from "react";

export interface SiteMapSubItem {
  id: number;
  name: string;
  icon: ReactNode;
  path: string;
}

export interface SiteMapItem {
  id: number;
  name: string;
  icon: ReactNode;
  path?: string;
  subPath?: SiteMapSubItem[];
}
export interface SiteMapGroup {
  id: number;
  name: string;
  items: SiteMapItem[];
}
