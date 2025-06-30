import mongoose from "mongoose";
import colors from "colors/safe";
const ConnectDb = async (mongoUrl: string) => {
  try {
    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    const conn = await mongoose.connect(mongoUrl, options);
    console.log(
      colors.bgCyan(
        `\nDataBase Connected Successfully to ${conn?.connection?.name} on ${conn?.connection?.host}`
      )
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Connection To DB Failed ${error.name} , ${error.message}`
      );
    } else throw error;
  }
};

export default ConnectDb;
