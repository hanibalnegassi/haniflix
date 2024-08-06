import qs from "querystringify";

import { Base, Pagination } from "../base";
import { List } from "./types";

const resourceName = "lists";

export class Lists extends Base {
  getAdminLists() {
    return this.request<List[]>(`${resourceName}/admin-list`);
  }

  getMyList() {
    return this.request<List[]>(`${resourceName}/my-list`);
  }

  createList(data: Partial<List>) {
    return this.request<List>(`${resourceName}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateList(id: number | string, data: Partial<List>) {
    return this.request<List>(`${resourceName}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteList(id: number | string) {
    return this.request<any>(`${resourceName}/${id}`, {
      method: "DELETE",
    });
  }

  addMovieToDefaultList(movieId: string | number) {
    return this.request<any>(`${resourceName}/add-movie-to-default-list`, {
      method: "POST",
      body: JSON.stringify({ movieId }),
    });
  }

  getRandomLists(
    type: string | undefined = undefined,
    genre: string | undefined = undefined
  ) {
    let query = resourceName;
    if (type) {
      query += qs.stringify({ type }, "?");
    }
    if (genre) {
      query += qs.stringify({ type }, type ? "&" : "?");
    }
    return this.request<any>(query);
  }
}
