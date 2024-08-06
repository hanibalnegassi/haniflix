import fetch from "isomorphic-unfetch";

type Config = {
  apiKey: string;
  basePath: string;
};

export type Pagination = {
  page?: number;
  per_page?: number;
};

export abstract class Base {
  private apiKey: string;
  private basePath: string;

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.basePath = config.basePath;
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = this.basePath + endpoint;
    const headers = {
      // "api-key": this.apiKey,
      // Authorization: `Bearer ${this.apiKey}`,
      token: `Bearer ${this.apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (options?.body != null && options.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    const config = {
      ...options,
      headers: {
        ...headers,
      },
    };

    return fetch(url, config)
      .then((r) => {
        if (r.ok) {
          return r.text();
        }
        throw new Error(r.statusText);
      })
      .then((r) => {
        // return r?.toString() as any;
        return r ? JSON.parse(r) : null;
        //return r ? JSON.parse(r) : null;
      });
  }
}
