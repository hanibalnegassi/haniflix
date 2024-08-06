import qs from "querystringify";

import { Base, Pagination } from "../base";
import { LoginRequest } from "./types";

const resourceName = "auth";

export class Auth extends Base {
  login(data: LoginRequest) {
    return this.request<any>(`${resourceName}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
