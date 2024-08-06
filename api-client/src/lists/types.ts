import type { Movie } from "../movies/types";

export type List = {
  _id: string | number;
  title: string;
  type: string;
  genre: string;
  content: Movie[];
  user: string;
};
