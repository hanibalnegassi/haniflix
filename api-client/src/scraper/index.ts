import qs from "querystringify";

import { Base, Pagination } from "../base";
import { ScraperPostBody } from "./types";

const resourceName = "scraper";

export class Scraper extends Base {
  scrapeWebsite(data: Partial<ScraperPostBody>) {
    return this.request<ScraperPostBody>(`${resourceName}/scrape`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
