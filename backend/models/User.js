const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    accessToken: { type: String },
    avatar: { type: String },
    fullname: { type: String },
    username: { type: String, unique: true },
    old_username: { type: String },
    email: { type: String, unique: true },
    old_email: { type: String },
    password: { type: String, required: true },
    _password: { type: String },
    profilePic: { type: String, defaut: '' },
    subscriptionId: { type: String, defaut: '' },
    isAdmin: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: true },
    otp: { type: String, default: '' },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    // default list is user's Watch list
    defaultList: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }, // Id of user's default list,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    billing: {
      cardNumber: String,
      expiryDate: String,
      cvc: String,
      country: String,
      nameOnCard: String,
      city: String,
      addressLine: String,
      province: String,
      zipCode: String,
      birthday: String,
    },
  },
  { timestamps: true }
);

// TODO: uncomment later
// pre hook to filter out soft-deleted users
// UserSchema.pre(/^find/, function (next) {
//   // Exclude soft-deleted users from queries
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

module.exports = mongoose.model('User', UserSchema);
