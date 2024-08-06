export type LoginRequest = {
  email: string;
  password: string;
};

export type List = {
  _id: string | number;
  title: string;
  type: string;
  genre: string;
  content: Movie[];
  user: string;
};

export type Movie = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  video: string;
  year: string;
  limit: number;
  genre: string;
  isSeries: boolean;
  created_at: Date;
  updated_at: Date;
};

export type ScraperPostBody = {
  url: string;
};

export type User = {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  isAdmin: boolean;
  isSubscribed: boolean;
  emailVerified: boolean;
  otp: string;
  // lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
};

export type Pagination = {
  page?: number;
  per_page?: number;
};
