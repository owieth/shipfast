import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  provider: {
    type: String,
    default: "credentials",
    enum: ["credentials", "google"],
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },

  isVarified: {
    type: Boolean,
    default: false,
  },
  stripeCustomerId: {
    type: String,
    unique: true,
  },
  stripePriceId: {
    type: String,
  },
  stripeCurrentPeriodEnd: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
  },
  varificationToken: String,
  varificationTokenExpire: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
