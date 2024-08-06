import qs from "querystringify";

import { Base, Pagination } from "../base";
import { Movie } from "./types";

const resourceName = "movies";

export class Movies extends Base {
  getMovies(params?: Pagination) {
    let query = resourceName;
    if (params) {
      query += qs.stringify(params, "?");
    }
    return this.request<Movie[]>(query);
  }

  getRandomMovies(type: string | undefined = undefined) {
    let query = `${resourceName}/random`;
    if (type) {
      query += qs.stringify({ type }, "?");
    }
    return this.request<Movie>(query);
  }

  /*getRandomMovies(id: number | string) {
    return this.request<Movie>(`${resourceName}/random`);
  }*/

  getMovie(id: number | string) {
    return this.request<Movie>(`${resourceName}/${id}`);
  }

  createMovie(data: Partial<Movie>) {
    return this.request<Movie>(`${resourceName}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateMovie(id: number | string, data: Partial<Movie>) {
    return this.request<Movie>(`${resourceName}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteMovie(id: number | string) {
    return this.request(`${resourceName}/${id}`, {
      method: "DELETE",
    });
  }

  likeMovie(id: number | string) {
    return this.request(`${resourceName}/${id}/like`, {
      method: "POST",
    });
  }

  dislikeMovie(id: number | string) {
    return this.request(`${resourceName}/${id}/dislike`, {
      method: "POST",
    });
  }
}
