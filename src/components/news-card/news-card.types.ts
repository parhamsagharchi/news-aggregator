import { ENewsSource } from "@/store/store.enum";

export interface INewsCard {
  title: string;
  description: string;
  date: string;
  url: string;
  imageUrl?: string | null;
  source: ENewsSource;
  author?: string | null;
}
