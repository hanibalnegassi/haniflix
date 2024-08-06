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
