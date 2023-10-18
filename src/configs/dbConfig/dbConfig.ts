import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`Connected to MongoDB at ${conn.connection.host}`);
    });

    connection.on("error", (error) => {
      console.log(`Error while connecting db: ${error}`);
      process.exit();
    });
  } catch (error: any) {
    console.log(`Error while connecting db: ${error}`);
  }
};

export default connectDB;
