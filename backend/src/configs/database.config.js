// import { connect, ConnectOptions } from "mongoose";

// export const dbConnect = () => {
//   connect(process.env.MONGO_URI!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as ConnectOptions).then(
//     () => console.log('Connecting to MongoDB:', process.env.MONGO_URI),

//     (error) => console.log(error)
//   );
// };


import mongoose from "mongoose";

export function dbConnect() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    () => console.log("Connected to MongoDB:", mongoUri),
    (error) => console.error("MongoDB connection error:", error)
  );
}
