import mongoose from 'mongoose';

try {
  mongoose.connect(process.env.MONGO_DB).then(() => {
    console.info('BD Conectada!');
  });
} catch (error) {
  console.log(error);
}


export default mongoose;