import { Users } from "./users";
import { Movies } from "./movies";
import { Lists } from "./lists";
import { Scraper } from "./scraper";
import { applyMixins } from "./utils";
import { Base } from "./base";
import { Auth } from "./auth";

class ApiClient extends Base {}
interface ApiClient extends Users, Movies, Auth, Lists, Scraper {}
applyMixins(ApiClient, [Users, Movies, Auth, Lists, Scraper]);

export default ApiClient;
