import qs from "querystringify";

import { Base, Pagination } from "../base";
import { User } from "./types";

const resourceName = "users";

export class Users extends Base {
  getUsers(params?: Pagination) {
    let query = resourceName;
    if (params) {
      query += qs.stringify(params, "?");
    }
    return this.request<User[]>(query);
  }

  getUser(id: number | string) {
    return this.request<User>(`${resourceName}/${id}`);
  }

  createUser(data: Partial<User>) {
    return this.request<User>(`${resourceName}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateUser(id: number | string, data: Partial<User>) {
    return this.request<User>(`${resourceName}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteUser(id: number | string) {
    return this.request<User>(`${resourceName}/${id}`, {
      method: "DELETE",
    });
  }
}
