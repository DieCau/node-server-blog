import mongoose from 'mongoose';

try {
  mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("✅ MongoDB Atlas conectado");
  });
} catch (err) {
  console.error("❌ Error MongoDB:", err)
}

export default mongoose;